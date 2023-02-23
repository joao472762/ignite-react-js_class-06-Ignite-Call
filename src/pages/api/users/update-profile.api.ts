import { z } from "zod";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";

import { prisma } from "@/libs/prisma";


export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
){
    if(request.method !== "PUT"){
        return response.status(405).end()
    }
    
    const session = await getServerSession(request,response, buildNextAuthOptions(request, response))
    
    if(!session){
        return response.status(401).end()
    }

    const requestBodySchema =  z.object({
        bio: z.string()
    })

    const {bio} = requestBodySchema.parse(request.body)

    if(bio.length === 0){
        return response.status(304).end()
    }
    

    await  prisma.user.update({
        where: {
            id: session?.user.id
        },
        data: {
           bio
        }
    })

    return response.status(204).end()


}