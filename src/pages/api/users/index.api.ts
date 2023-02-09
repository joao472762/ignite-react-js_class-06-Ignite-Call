// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/libs/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { z } from 'zod'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method !== 'POST'){
    //method not allowed
    return res.status(405).end()
  }

  const newUserBody = z.object({
    name: z.string(),
    userName: z.string(),
  })

  const newUser = newUserBody.parse(req.body)

  const {name,userName} = newUser
  

  const  userExists = await prisma.user.findUnique({
    where: {
      userName: userName,
    }
  })

  if(userExists){
    return res.status(400).send({message: 'userName already exists'})
  }
 

  const user = await prisma.user.create({
    data: {
      name,
      userName,

    }
  })

  setCookie({res}, '@ignitecall:userId', user.id, {
    secure: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days 
    path: '/'

  })
  


  return res.status(201).json({})


}
