import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";

import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { prisma } from "@/libs/prisma";

const timeIntervalBodySchema = z.object({
    intervals: z.array(z.object({
        weekday: z.number().min(0).max(7),
        startTimeInMinutes: z.number(),
        endTimeInMinutes: z.number(),
    }))
})

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
    if(request.method !== "POST"){
        return response.status(405).end()
    }
    const session = await getServerSession(request, response, buildNextAuthOptions(request, response))

    if(!session){
        return response.status(404).end()
    }

    const {intervals} = timeIntervalBodySchema.parse(request.body)

    await Promise.all(intervals.map(interval => {
        return prisma.userTimeInterval.create({
            data: {
                time_end_in_minutes: interval.endTimeInMinutes,
                time_start_in_minutes: interval.startTimeInMinutes,
                week_day: interval.weekday,
                user_id: session.user.id
            }
        })
    }))


   
    

    return response.status(201).json({
        user: session.user
    })
}