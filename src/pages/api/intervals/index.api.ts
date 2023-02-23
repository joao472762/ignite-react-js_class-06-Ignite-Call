import { prisma } from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {

  if(request.method !== "GET") {
    return response.status(403).end()
  }

  const session = await getServerSession(request,response, buildNextAuthOptions(request, response))

  if(!session){
    return response.status(400).end()
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      userName: session.user.userName
    }
  })

  const intervals = await prisma.userTimeInterval.findMany({
    where: {
      user_id: user.id
    },
    
  })
  const intervalsFormated = intervals.map(interval => {
    return {
      weekDay: interval.week_day,
      timeEnd: interval.time_end_in_minutes / 60,
      timeStart: interval.time_start_in_minutes / 60
    }
  })
  return response.status(200).json(intervalsFormated)
}
