import { prisma } from "@/libs/prisma";
import dayjs from "dayjs";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler (
    request: NextApiRequest,
    response: NextApiResponse
){
    if(request.method !== "GET"){
        return response.status(405).end()
    }

    const requestParmsSchema = z.object({
        username: z.string(),
        date: z.string(),
    })

    const {username,date} = requestParmsSchema.parse(request.query)

    const user = await prisma.user.findUnique({
        where: {
            userName: username
        }
    })

    if(!user){
        return response.status(404).json({
            message: 'User does not exist'
        })
    }

    const referenceDate = dayjs(date)

    const isPastDate = referenceDate.endOf('day').isBefore(new Date())

    if(isPastDate){
        return response.json({
            possibleTimes: [],
            avaliableTimes: []
           
        })
    }


    const userAvaliability = await prisma.userTimeInterval.findFirst({
        where: {
            user_id: user.id,
            week_day: referenceDate.get('day')
        },
    
    })

    if(!userAvaliability){
        return response.json({
             possibleTimes: [],
            avaliableTimes: []
        })
    }

    const {time_end_in_minutes,time_start_in_minutes} = userAvaliability
    const startHour = time_start_in_minutes / 60 // 4
    const endHour = time_end_in_minutes / 60 // 7

    const diferenceBetweenHours = endHour - startHour

    const possibleTimes = Array.from({
        length: diferenceBetweenHours 
    }, (_, index) => {
        return startHour + index
    } )

    const blockedTimes = await prisma.scheduling.findMany({
        select: {
            date: true
        },
        where: {
            user_Id: user.id,
            date: {
                gte: referenceDate.set('hour', startHour).toDate(), 
                lte: referenceDate.set('hour', endHour).toDate()
            }
        }
    })


    const avaliableTimes =  possibleTimes.filter(time =>{
        return !blockedTimes.some(blockedTime => blockedTime.date.getHours() === time)
    })

    return response.json({
        possibleTimes,
        avaliableTimes
    })


}