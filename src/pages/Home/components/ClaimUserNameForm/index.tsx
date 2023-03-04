import * as z from 'zod'
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { Button, Text, TextInput } from "@ignite-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';

import { ClaimUserNameFormContainer, FormAnotation } from "./styles";

const ClaimUserNameFormSchema = z.object({
    userName: z.string()
        .min(4,'Usuário precisa ter pelo menos 3 letras')
        .max(40,'Usuário precisa ter menos de 40 letras')
        .regex(/^([a-zà-ú0-9\\-]+)$/i, 'retire os caracteres especiais e espaços')
        .transform(username => username.toLocaleLowerCase())
})

type ClaimUserNameFormData = z.infer<typeof ClaimUserNameFormSchema>

export function ClaimUserNameForm() {
    const router = useRouter()


    const {handleSubmit,register, formState:{errors, isSubmitting}} = useForm<ClaimUserNameFormData>({
        resolver: zodResolver(ClaimUserNameFormSchema)
    })

    async function ClaimUserNmae(data:ClaimUserNameFormData ){
        const {userName} = data
        await router.push(`/register?username=${userName}`)
    }

    return (
        <>
            <ClaimUserNameFormContainer as='form' onSubmit={handleSubmit(ClaimUserNmae)} >
                <div>
                    <TextInput
                        {...register('userName')}
                        prefix="ignite.com/"
                        placeholder="seu-usuário"
                        size={'sm'}
                    />

                </div>

                <Button
                    size={'sm'}
                    disabled={isSubmitting}
                    type='submit'
                >
                    Resevar
                </Button>
            </ClaimUserNameFormContainer>
            
        <FormAnotation>
            <Text size={'sm'}>
                { errors && errors.userName?.message
                    ? errors.userName.message
                    :'Digite o nome do usuário	desejado'
                }
            </Text>
        </FormAnotation>
                  
        </>

    )
}