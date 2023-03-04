import { getGetGoogleOAuthToken } from "@/libs/google";
import { prisma } from "@/libs/prisma";
import dayjs from "dayjs";
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler (
    request: NextApiRequest,
    response: NextApiResponse
) {
    if(request.method !== 'POST'){
        return response.status(405).end()
    }

    const requestQuerySchema =  z.object({
        username: z.string()
    })



    const {username} = requestQuerySchema.parse(request.query)

    const user  = await prisma.user.findUnique({
        where: {
            userName: username
        }
    })

    if(!user){
        return response.status(404).json({
            message: 'User does not exist'
        })
    }

    const newSchedulingBodySchema = z.object({
        name: z.string(),
        date: z.string().datetime(),
        observation: z.string().nullable(),
        email: z.string().email({message: 'Digite um email válido'}),
    },)

    const newScheduling = newSchedulingBodySchema.parse(request.body)
    const schedulingDate  = dayjs(newScheduling.date).startOf('hour')

    if(schedulingDate.isBefore(new Date)){
        return response.status(404).json({
            message: 'date is in the past'
        })
    }

    const conflictingSchedule = await prisma.scheduling.findFirst({
        where: {
            date: schedulingDate.toDate(),
            user_Id: user.id,
        }
    })

    if(conflictingSchedule){
        response.status(404).json({
            message: 'there is another scheduling at same time'
        })
    }

    const {id:schedulingId} = await prisma.scheduling.create({
        data: {
            date: schedulingDate.toDate(),
            email: newScheduling.email,
            name: newScheduling.name,
            observation: newScheduling.observation,
            user_Id: user.id,
        },
        select: {
            id: true
        }
    })
    const calendar = google.calendar({
        version: 'v3',
        auth: await getGetGoogleOAuthToken(user.id)
    })

    await calendar.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: 1,
        requestBody: {
            summary: `Ignite Call: ${newScheduling.name}`,
            description: newScheduling.observation,
            start: {
                dateTime: schedulingDate.format()
            },
            end: {
                dateTime: schedulingDate.add(1, 'hour').format()
            },
            attendees: [
                {
                    email: newScheduling.email,
                    displayName: newScheduling.name,
                }
            ],
            conferenceData: {
                createRequest: {
                    requestId: schedulingId,
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet'
                    }
                }
            }
        }
    })

    

    return response.status(201).end()


}