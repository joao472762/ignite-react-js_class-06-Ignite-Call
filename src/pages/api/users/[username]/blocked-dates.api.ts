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
        year: z.string(),
        month: z.string(),
        username: z.string()
    })

    const {username,month,year} = requestParmsSchema.parse(request.query)

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

    const avaliableWeeks = await prisma.userTimeInterval.findMany({
        select: {
            week_day: true,
        },
        where: {
            user_id: user.id
        }
    })

    const WeekDaysArray = [0,1,2,3,4,5,6]

    const blockedWeekDays = WeekDaysArray.filter(weekDay => {
        return !avaliableWeeks.some(({week_day}) => week_day === weekDay )
    })

 


  return response.json({
    blockedWeekDays
  })
}