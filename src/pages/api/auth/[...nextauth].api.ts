import { PrismaAdapter } from "@/libs/auth/prisama.adpter"
import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"

export function buildNextAuthOptions(
  request: NextApiRequest,
  response: NextApiResponse
): NextAuthOptions  {
  return {
    // Configure one or more authentication providers
    adapter: PrismaAdapter(request, response),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
          params: {
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
          }
        },
        profile(profile: GoogleProfile){
          return {
            id: profile.sub,
            name: profile.name,
            userName: '',
            email: profile.email,
            avatar_url: profile.picture
          }
        }
       
      }),
      // ...add more providers here
    ],

    callbacks: {
      async signIn({account}){
        if(!account?.scope?.includes('https://www.googleapis.com/auth/calendar')){
          return '/register/conect-calendar?error=permission'
        }
        return true
      },
       session({session, user}){
        return {
          ...session,
          user,
        }
      }
     
    }
  }
}

export default async function auth(request: NextApiRequest, response: NextApiResponse  ) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(request, response, buildNextAuthOptions(request, response))
}