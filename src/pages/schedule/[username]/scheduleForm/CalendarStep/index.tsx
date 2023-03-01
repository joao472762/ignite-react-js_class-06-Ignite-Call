import { format } from "date-fns";
import { useEffect, useState } from "react";


import { api } from "@/libs/axios";
import { Calendar } from "@/components/Calendar";
import { formatMonthAndDay, formatWeek } from "@/utils/formatDate";

import {  
    DatePicker,
    TimePickerHeader, 
    TimePickerItem, 
    TimePickerList, 
    CalendarStepContainer 
} from "./styles";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { date } from "zod";
import { useQuery } from "@tanstack/react-query";

interface availabilityProps {
    possibleTimes: Array<number>,
    avaliableTimes: Array<number>,
}

interface queryParams extends ParsedUrlQuery {
    username: string
}

export function CalendarStep(){

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


   

    
    function onDateSelected(date: Date) {    
        setSelectedDate(date)
    }


    const weekDay = selectedDate && dayjs(selectedDate).format('dddd')
    const describeDate = selectedDate && dayjs(selectedDate).format("DD [de] MMMM")


    const hasDateSelected = !!selectedDate


    return (
        <CalendarStepContainer isTimePickerOpen={hasDateSelected}>
            <Calendar
                selectedDate={selectedDate}
                onDateSelected={onDateSelected}
            />
            {
                hasDateSelected && (
                    <DatePicker>
                        <TimePickerHeader>
                            {weekDay}, <span>{describeDate}</span>
                        </TimePickerHeader>
                        <TimePickerList>
                            {   availability?.avaliableTimes && (
                                availability?.avaliableTimes.map(hour => (
                                    <TimePickerItem 
                                        key={hour}
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