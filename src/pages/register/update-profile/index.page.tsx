import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { api } from '@/libs/axios'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'
import { getServerSession } from 'next-auth/next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, Button, Heading, MultiStep, Text, TextArea} from '@ignite-ui/react'

import { Header } from '../components'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { FormAnotation, ProfileBox, UpadeteProfileContainer } from './styles'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'

const updateProfileSchema = z.object({
    bio: z.string().min(1),

})

type updateProfileData = z.infer<typeof updateProfileSchema>
export default function UpdateProfile(){
    const router = useRouter()
    const {data} = useSession()
    const { handleSubmit,register, formState: { isSubmitting } } = useForm<updateProfileData>({
        resolver: zodResolver(updateProfileSchema)
    })

    async function handleUpdateBioProfile(formData: updateProfileData){
        await api.put('/users/update-profile',{
            bio: formData.bio
        })
        await router.push(`/schedule/${data?.user.userName}`)
    }
    
    return (
        <>
            <NextSeo
                title="Atualize o seu perfil | Ignite Call"
                noindex
            />
            <UpadeteProfileContainer>
                <Header>
                    <Heading as='strong'>Defina sua disponibilidade</Heading>
                    <Text>Por último, uma breve descrição e uma foto de perfil.</Text>
                    <MultiStep size={4} currentStep={4} />
                </Header>
                <ProfileBox  
                    as='form'
                    onSubmit={handleSubmit(handleUpdateBioProfile)}
                >
                    <label>
                        <Text size={'sm'}>Foto de perfil</Text>
                        <Avatar  src={data?.user.avatar_url} alt={data?.user.name}/>
                    </label>
                    
                    <label>
                        <Text size={'sm' }> Sobre você</Text>
                        <TextArea 
                            {...register('bio')}
                            placeholder='escreva algo sobre'
                        />
                        <FormAnotation>Fale um pouco sobre você. Isto será exibido em sua página pessoal.</FormAnotation>
                    </label>
                    
                    <Button
                        type='submit'
                        disabled={isSubmitting}
                    >
                        Próximo passo <ArrowRight />
                    </Button>
                    

                </ProfileBox>
            </UpadeteProfileContainer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req:request, res:response }) => {
    const session = await getServerSession(request, response, buildNextAuthOptions(request, response))
    return {
        props: { 
            session
        }
    }
}