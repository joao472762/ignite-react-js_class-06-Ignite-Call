import { z } from "zod"
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarBlank, Clock } from "phosphor-react"
import { Button, Text, TextArea, TextInput } from "@ignite-ui/react"

import {
    FormError,
    FormFields,
    ConfirmStepFooter,
    ConfirmStepHeader,
    ConfirmStepContainer,
} from './styles'

const confirmFormSchema = z.object({
    name: z.string().min(3,{message: ') nome precisa ter pelo menos 3 caracteres'}),
    email: z.string().email({message: 'Digite um email válido'}),
    observation: z.string()
})

type confirmFormData = z.infer<typeof confirmFormSchema>


export function ConfirmStep(){
    const { handleSubmit, register, formState} = useForm<confirmFormData>({
        resolver: zodResolver(confirmFormSchema)
    })
    const {errors, isSubmitting} = formState

    function handleConfirmSchadule(formData: confirmFormData) {
        console.log(formData)
    }
    return (
        <ConfirmStepContainer as='form'  onSubmit={handleSubmit(handleConfirmSchadule)}>
            <ConfirmStepHeader>
                
                    <Text>
                        <CalendarBlank/>
                        22 de Setembro de 2022
                    </Text>
                
                    <Text>
                        <Clock/>
                        18:00h
                        </Text>
                
            </ConfirmStepHeader>
            
            <FormFields >
                <label>
                    <Text size={'sm'}>Seu nome</Text>
                    <TextInput
                        {...register('name')}
                         prefix="/cal.com/"
                    />
                    {errors && errors.name && (
                        <FormError size={'sm'}>{errors.name.message}</FormError>
                    )}
                </label>
                <label>
                    <Text size={'sm'}>Endereço de e-mail</Text>
                    <TextInput
                        placeholder="seuemail@gmail.com"
                        {...register('email')}
                    />
                    {errors && errors.email?.message && (
                        <FormError size={'sm'}>{errors.email.message}</FormError>
                    )}
                    
                </label>

                <label>
                    <Text size={'sm'}>Observação</Text>
                    <TextArea
                        
                        {...register('observation')}
                    />
                  
                    
                </label>

            </FormFields>
            <ConfirmStepFooter >
                <Button type="button" variant={'tertiary'}>Cancelar</Button>
                <Button type="submit" disabled={isSubmitting} >Confirmar</Button>
            </ConfirmStepFooter>
        </ConfirmStepContainer>
    )
}