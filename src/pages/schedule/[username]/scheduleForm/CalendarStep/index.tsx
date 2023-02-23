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

interface userIntervalsProps {
    weekDay: number
    timeEnd: number
    timeStart: number
}

export function CalendarStep(){
    const [userIntervals, setUserIntervals] = useState<userIntervalsProps[]>([])

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [dateIsSelected, setDateIsSelected] = useState(false)


    function updatedSelectedDate(date: Date) {
        setSelectedDate(date)
        setDateIsSelected(true)
    }

    const weekday = Number(format(selectedDate, 'i'))
    const intervalDay = userIntervals.find(interval => interval.weekDay === weekday)

    const totalHoursAvaliable = intervalDay ? Number((intervalDay.timeEnd + 1 - intervalDay.timeStart)?.toFixed()) : 0

    const intevalsHoursAvailable = Array.from(Array(totalHoursAvaliable).keys()).map((_, index) => {
        return `${index + intervalDay!?.timeStart}:00`
    })



    async function fetchUserIntervals() {
        const response = await api.get(`/intervals`)
        setUserIntervals(response.data)
    }


    useEffect(() => {
        fetchUserIntervals()
    }, [])


    return (
        <CalendarStepContainer isTimePickerOpen={dateIsSelected}>
            <Calendar updatedSelectedDate={updatedSelectedDate}/>
            {
                dateIsSelected && (
                    <DatePicker>
                        <TimePickerHeader>
                            {formatWeek.format(selectedDate)}, <span>{formatMonthAndDay.format(selectedDate)}</span>
                        </TimePickerHeader>
                        <TimePickerList>
                            {
                                intevalsHoursAvailable.map(hour => (
                                    <TimePickerItem key={String(hour)}>
                                        {hour}
                                    </TimePickerItem>

                                ))
                            }

                        </TimePickerList>

                    </DatePicker>

                )
            }

        </CalendarStepContainer>
    )
}