import { z } from "zod";
import { NextSeo } from "next-seo";
import { ArrowRight } from "phosphor-react";
import { useRouter } from "next/router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button, Checkbox, Heading, MultiStep,Text, TextInput } from "@ignite-ui/react";

import { api } from "@/libs/axios";
import { Header } from "../styles";
import { getWeekDays } from "@/utils/getWeekDays";
import { covertTimeStringToMinutes } from "@/utils/covert-time-string-to-minutes";
import { 
    TimeIntervalContainer,
    IntervalItem, 
    IntervalBox, 
    IntervalDay, 
    IntervalInputs, 
    FormError
} from "./styles";

const timeIntervalFormSchema = z.object({
    intervals: z.array(z.object({
        weekday: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(), 
        endTime: z.string(),
    }))
    .length(7)
    .transform(intervals => intervals.filter(interval => interval.enabled === true))
    .refine(intervals => intervals.length > 0,{
        message: 'Você precisa selecionar pelo meno um dia da semana',

    })
    .transform(intervals => {
        return intervals.map(interval =>(
            {
               weekday: interval.weekday,
               startTimeInMinutes: covertTimeStringToMinutes(interval.startTime),
               endTimeInMinutes: covertTimeStringToMinutes(interval.endTime)
           }
        ))
    })
    .refine(intervals => {
        return intervals.every(interval => interval.startTimeInMinutes + 60 <=  interval.endTimeInMinutes)
    }, {
        message: 'O horário de término deve ser pelo menos 1h hora maior que o início'
    })
})

type timeIntervalFormInput = z.input<typeof timeIntervalFormSchema>
type timeIntervalFormOutput = z.output<typeof timeIntervalFormSchema>

export default function TimeInterval(){
    const router = useRouter()

    const {handleSubmit,
        register,
        control,
        watch, 
        formState: {errors, isSubmitting}
    } = useForm<timeIntervalFormInput>({
        resolver: zodResolver(timeIntervalFormSchema),
        defaultValues: {
            intervals: [
                {weekday: 0, enabled: false, startTime: '08:00', endTime: '16:00' },
                { weekday: 1, enabled: true, startTime: '08:00', endTime: '16:00' },
                { weekday: 2, enabled: true, startTime: '08:00', endTime: '16:00' },
                { weekday: 3, enabled: true, startTime: '08:00', endTime: '16:00' },
                { weekday: 4, enabled: true, startTime: '08:00', endTime: '16:00' },
                { weekday: 5, enabled: true, startTime: '08:00', endTime: '16:00' },
                { weekday: 6, enabled: false, startTime: '08:00', endTime: '16:00' }
            ]
        }
    })

    const intervals = watch('intervals')

    const {fields} = useFieldArray({
        name: 'intervals',
        control
    })
    
    const weekDays = getWeekDays()

    async function handleSetTimeIterval(data: any){
        const formData = data as timeIntervalFormOutput

        try {
            await api.post('/users/time-intervals',{
                intervals: formData.intervals.map(formIntervals => ({
                    weekday: formIntervals.weekday,
                    startTimeInMinutes: formIntervals.startTimeInMinutes,
                    endTimeInMinutes: formIntervals.endTimeInMinutes,
                }))
            })
            await router.push('/register/update-profile',)
        } catch (error) {
            console.log(error)
            alert('falha ao registrar dias disponíveis')
        }
    }

    return (
        <>
            <NextSeo
                title="Selecione sua disponibilidade | Ignite Call"
                noindex
            />
            <TimeIntervalContainer>

                <Header>
                    <Heading as='strong'>Quase lá</Heading>
                    <Text>Defina o intervalo de horários que você está disponível em cada dia da semana.</Text>
                    <MultiStep size={4} currentStep={1} />
                </Header>

                <IntervalBox 
                    as='form'
                    onSubmit={handleSubmit(handleSetTimeIterval)}
                >
                    <section>
                        {
                            fields.map((interval,index) => (
                                <IntervalItem key={interval.id}>
                                    <IntervalDay>
                                        <Controller
                                            name={`intervals.${index}.enabled`} 
                                            control={control}
                                            render={({field}) =>  (
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={checked => field.onChange(checked === true)}
                                                />

                                            )}
                                            
            
                                        />

                                        <Text>{weekDays[interval.weekday]}</Text>
                                    </IntervalDay>
                                    <IntervalInputs>
                                        <TextInput
                                            type='time'
                                            step={60}
                                            disabled={intervals[index].enabled === false}
                                            {...register(`intervals.${index}.startTime`)}
                                        />
                                        <TextInput
                                            type='time'
                                            step={60}
                                            disabled={intervals[index].enabled === false}
                                            {...register(`intervals.${index}.endTime`)}
                                        />
                                    </IntervalInputs>
                                </IntervalItem>
                            ))
                        }
                
                    </section>
                    {errors.intervals && errors.intervals.message &&
                        <FormError>
                            {errors.intervals.message}
                        </FormError>
                    
                    }
                    <Button 
                        disabled={isSubmitting}
                        type="submit"
                    >
                        Próximo passo <ArrowRight/> 

                    </Button>
                </IntervalBox>
            </TimeIntervalContainer>
        
        </>
    )
}