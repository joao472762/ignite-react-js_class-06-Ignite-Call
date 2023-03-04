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
import dayjs from "dayjs"
import { api } from "@/libs/axios"
import { useRouter } from "next/router"
import { ParsedUrlQuery } from "querystring"


interface ConfirmStepProps {
    schedulingDate: Date | null,
    clearSelectedDateTime: () => void,
}

interface queryParams extends ParsedUrlQuery {
    username: string
}

const confirmFormSchema = z.object({
    name: z.string().min(3,{message: ') nome precisa ter pelo menos 3 caracteres'}),
    email: z.string().email({message: 'Digite um email válido'}),
    observation: z.string().nullable()
})

type confirmFormData = z.infer<typeof confirmFormSchema>


export function ConfirmStep({ schedulingDate, clearSelectedDateTime }: ConfirmStepProps){
    const { handleSubmit, register, formState} = useForm<confirmFormData>({
        resolver: zodResolver(confirmFormSchema)
    })
    const {errors, isSubmitting} = formState

    const {query} = useRouter()
    const {username} = query as queryParams

    async function handleConfirmSchadule(formData: confirmFormData) {
        await api.post(`/users/${username}/scheduling`,{
            date: schedulingDate,
            name: formData.name,
            observation: formData.observation,
            email: formData.email,
        })

        clearSelectedDateTime()
    }
    
    function handleClearSelectedDateTime() {
        clearSelectedDateTime()
    }
    
    const schedulingDateReferrence = dayjs(schedulingDate)
    const describeDate = schedulingDateReferrence.format('DD [de] dddd [de] YYYY')
    const describeTime   = schedulingDateReferrence.format('HH:mm[0]')

    return (
        <ConfirmStepContainer as='form'  onSubmit={handleSubmit(handleConfirmSchadule)}>
            <ConfirmStepHeader>
                
                    <Text>
                        <CalendarBlank/>
                         {describeDate}
                    </Text>
                
                    <Text>
                        <Clock/>
                    {describeTime   }
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
                <Button 
                    onClick={handleClearSelectedDateTime}
                    type="button" 
                    variant={'tertiary'}
                >
                    Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting} >Confirmar</Button>
            </ConfirmStepFooter>
        </ConfirmStepContainer>
    )
}