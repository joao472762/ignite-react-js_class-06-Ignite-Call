import dayjs from "dayjs";
import {  useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/libs/axios";
import { Calendar } from "@/components/Calendar";
import {  
    DatePicker,
    TimePickerHeader, 
    TimePickerItem, 
    TimePickerList, 
    CalendarStepContainer 
} from "./styles";

interface availabilityProps {
    possibleTimes: Array<number>,
    avaliableTimes: Array<number>,
}

interface queryParams extends ParsedUrlQuery {
    username: string
}

interface CalendarStepProps {
    onSelectDateTime: (date: Date) => void
}

export function CalendarStep({ onSelectDateTime}: CalendarStepProps){

    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const {query} = useRouter()
    const { username } = query as queryParams
    const selectedDateWithoutTime = selectedDate && dayjs(selectedDate).format('YYYY-MM-DD')
    

    const { data: availability } = useQuery<availabilityProps>(['availability', selectedDateWithoutTime], async () => {

        if (!selectedDate) {
            return
        }
        
        const response = await api.get(`/users/${username}/avaliable`, {
            params: {
                date: dayjs(selectedDate).format('YYYY-MM-DD')
            }
        })

        return response.data
        },
        {
            enabled: !!selectedDate
        }
    )
    console.log(availability)

    function handleSelectDate(hour: number){
        const dateWithTime = dayjs(selectedDate)
            .set('hour', hour)
            .startOf('hour')
            .toDate()
        
        onSelectDateTime(dateWithTime)
    }

    function onDateSelected(date: Date) {    
        setSelectedDate(date)
    }


    const weekDay = selectedDate && dayjs(selectedDate).format('dddd')
    const describeDate = selectedDate && dayjs(selectedDate).format("DD [de] MMMM")
    
    const hasDateSelected = !!selectedDate

    return (
        <CalendarStepContainer isTimePickerOpen={hasDateSelected}>
            <Calendar
                
                onDateSelected={onDateSelected}
            />
            {
                hasDateSelected && (
                    <DatePicker>
                        <TimePickerHeader>
                            {weekDay}, <span>{describeDate}</span>
                        </TimePickerHeader>
                        <TimePickerList>
                            {   availability?.possibleTimes && (
                                availability?.possibleTimes.map(hour => (
                                    <TimePickerItem 
                                        key={hour}   
                                        onClick={() => handleSelectDate(hour)}
                                        disabled={!availability.avaliableTimes.includes(hour)}
                                    >
                                        {String(hour).padStart(2, '0')}:00
                                    </TimePickerItem>
                                ))

                            )
                            }
                            

                        </TimePickerList>

                    </DatePicker>

                )
            }

        </CalendarStepContainer>
    )
}