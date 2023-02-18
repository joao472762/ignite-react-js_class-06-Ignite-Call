import { NextApiRequest, NextApiResponse, NextPageContext } from "next";
import { Adapter } from "next-auth/adapters";
import { destroyCookie, parseCookies } from 'nookies';
import { prisma } from "../prisma";

export  function PrismaAdapter(
    request: NextApiRequest | NextPageContext['req'],
    response: NextApiResponse | NextPageContext['res'],
  ): Adapter {
  return {
    async createUser(user) {
      
      const {'@ignitecall:userId': userIdOnCookies} =  parseCookies({req:request})

      if(!userIdOnCookies){
        throw new Error('user Id Not found on Cokie')
      }

      const userUpdated = await prisma.user.update({
        where: {
          id: userIdOnCookies
        },
        data: {
          email: user.email,
          avatar_url: user.avatar_url,
          name: user.name,
        }
      })

      destroyCookie({res: response}, "@ignitecall:userId", {
        path: '/'
      })


      return {
        id: userUpdated.id,
        email:userUpdated.email!,
        emailVerified: null,
        name: userUpdated.name,
        avatar_url: userUpdated.avatar_url!,
        userName: userUpdated.name,
      }

     
    },

    async getUser(id) {
    
      const user = await prisma.user.findUnique({
          where:{
              id
          }
      })

      if(!user){
        return null;
      }
      return {
        id: user.id,
        email:user.email!,
        emailVerified: null,
        name: user.name,
        avatar_url: user.avatar_url!,
        userName: user.userName,
        
      }

    },
    async getUserByEmail(email) {
      
      const user = await prisma.user.findUnique({
          where:{
              email
          }
      })

      if(!user){
        return null;
      }
      return {
        id: user.id,
        email:user.email!,
        emailVerified: null,
        name: user.name,
        avatar_url: user.avatar_url!,
        userName: user.name,
        
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {

      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider: provider,
            provider_account_id: providerAccountId
          }
        },
        include: {
          user: true
        }
        
      })

      if(!account){
        return null;
      }

      const {user} = account

      return {
      id: user.id,
      email:user.email!,
      emailVerified: null,
      name: user.name,
      avatar_url: user.avatar_url!,
      userName: user.name,
      
    }
      
    },
    async updateUser(user) {
      const userUpdated = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
           name: user.name,
           email: user.email,
           avatar_url: user.avatar_url,

        }

      })

      return {
        id: userUpdated.id,
        email:userUpdated.email!,
        emailVerified: null,
        name: userUpdated.name,
        avatar_url: userUpdated.avatar_url!,
        userName: userUpdated.name,
      }
    },
    async deleteUser(userId) {
      await prisma.user.delete({
        where: {
          id: userId,
        }
      })
    },
    async linkAccount(account) {
      await prisma.account.create({
          data: {
            user_id: account.userId ,
            type: account.type ,
            provider: account.provider,
            provider_account_id: account.providerAccountId ,
            refresh_token: account.refresh_token ,
            access_token: account.access_token ,
            expires_at: account.expires_at ,
            token_type: account.token_type ,
            scope: account.scope ,
            id_token: account.id_token ,
            session_state: account.session_state ,

          }
        })
    },
    async createSession({ sessionToken, userId, expires }) {
      const session = await prisma.session.create({
        data: {
          session_token: sessionToken,
          user_id: userId,
          expires: expires,
        }
      })
    
      return {
        expires: session.expires,
        sessionToken: session.session_token,
        userId: session.user_id
      }
    },
    

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findFirstOrThrow({
        where: {
          session_token: sessionToken
        },
        include: {
          user: true
        }
      })

      if(!prismaSession){
        return null
      }
      const {user, ...session} = prismaSession

      return {
        session: {
          userId: user.id,
          expires: session.expires,
        sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          email:user.email!,
          emailVerified: null,
          name: user.name,
          avatar_url: user.avatar_url!,
          userName: user.name,
        }
      }
    },
    async updateSession({ sessionToken,expires, userId}) {
      const sessionUpdated = await prisma.session.update({
        where: {
          session_token: sessionToken,

        },
        data: {
          user_id: userId,
          expires: expires
        }
      })

      return {
        expires: sessionUpdated.expires,
        sessionToken: sessionUpdated.session_token,
        userId: sessionUpdated.user_id
      }
    },

    async deleteSession(sessionToken){
      await prisma.session.delete({
        where: {
          session_token: sessionToken
        }
      })

    }

  }
}