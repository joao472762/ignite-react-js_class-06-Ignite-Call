import { Avatar} from "@ignite-ui/react"
import { Text } from "@ignite-ui/react";

import {  GetStaticPaths, GetStaticProps,  } from "next"

import { ScheduleContainer, Header, Title} from "./styles"

import { prisma } from "@/libs/prisma";
import { ScheduleForm } from "./scheduleForm";


interface ScheduleProps {
    user: {
        name: string,
        bio: string,
        avatarUrl: string,


    }
}

export  default function  Schedule({user}: ScheduleProps){
    
    return (
        <ScheduleContainer>
            <Header>
                <Avatar src={user.avatarUrl} />
                <Title>{user.name}</Title   >
                <Text>{user.bio}</Text>
            </Header>
            <ScheduleForm/>
            
        </ScheduleContainer>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const username = String(params?.username)
    const user = await prisma.user.findUnique({
        where: {
            userName: username
        }
    })

    if(!user){
        return {
            notFound: true,
        }
    }

   
    return {
        props: {
            user: {
                 
                
                name: user.name,
                bio: user.bio,
                avatarUrl: user.avatar_url,
            }
        },
        revalidate: 60 * 60 * 24 // 1 day
    }
}   