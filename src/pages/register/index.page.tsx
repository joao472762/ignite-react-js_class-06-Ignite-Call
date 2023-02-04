import { z } from "zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ArrowRight } from "phosphor-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";

import {  FormError, Header, RegisterContainer, RegisterForm } from "./styles";
import { useEffect } from "react";

const registerFormSchema = z.object({
    userName: z.string()
        .min(4,'Usuário precisa ter pelo menos 3 letras')
        .regex(/^([a-zà-ú0-9\\-]+)$/i, 'retire os caracteres especiais e espaços')
        .transform(username => username.toLocaleLowerCase()),
    name: z.string()
        .min(4,'Usuário precisa ter pelo menos 3 letras')
        .regex(/^([a-zà-ú0-9 \\-]+)$/i, 'retire os caracteres especiais')
})

type registerFormData = z.infer<typeof registerFormSchema>

export default function Register(){
    const router = useRouter()

    const {register, handleSubmit, setValue, formState:{errors, isSubmitting}} = useForm<registerFormData>({
        resolver: zodResolver(registerFormSchema),
  
    })
    

    async function Register(data: registerFormData){

    }

    useEffect(() => {
        if(router.query?.username){
            setValue('userName',String(router.query?.username))
        }
    } , [router.query?.username, setValue])
    return (
        <RegisterContainer>
                <Header>
                    <Heading as='strong'>Bem-vindo ao Ignite Call!</Heading>
                    <Text>
                        Precisamos de algumas informações para criar seu perfil! Ah, você pode editar essas informações depois.
                    </Text>
                    <MultiStep size={4} currentStep={1}/>
                </Header>

                <RegisterForm as={'form'} onSubmit={handleSubmit(Register)}>

                    <label>
                        <Text>Nome de usuário</Text>
                        <TextInput 
                            prefix="cal.com/"
                            {...register('userName')} 
                        />
                        {errors && errors.userName?.message && (
                            <FormError size={'sm'}> {errors.userName.message}</FormError>
                        )}
                    </label>
                 

                    <label>
                        <Text>Nome de usuário</Text>
                        <TextInput 
                            placeholder="seuNome"
                            {...register('name')} 
                        />
                        {errors && errors.name?.message && (
                            <FormError size={'sm'}> {errors.name.message}</FormError>
                        )}
                    </label>

                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Próximo passo <ArrowRight/>
                    </Button>
                </RegisterForm>
        
        </RegisterContainer>
    )
}