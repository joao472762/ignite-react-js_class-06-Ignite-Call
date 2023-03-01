import { useMemo, useState } from "react";
import { CaretLeft, CaretRight } from "phosphor-react";
import dayjs from 'dayjs'
import { addMonths, format, lastDayOfMonth as getLastDayOfMonth, subMonths } from "date-fns";

import { Text } from "@ignite-ui/react";
import { formatMouth } from "@/utils/formatDate";
import { getWeekDays } from "@/utils/getWeekDays";
import { CalendarTitle, HeaderActions, CalendarContent, WeekDays, CalendarDays, CalendarHeader, CalendarDay, CalendarContainer } from "./styles";
import { ptBR } from "date-fns/locale";
import {useQuery} from '@tanstack/react-query'
import { api } from "@/libs/axios";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";


interface CalendarProps {
    onDateSelected: (date: Date) => void,
    selectedDate: Date | null
}

interface CalendarWeek {
    weekDay: number,
    days: Array<{
        date:  dayjs.Dayjs,
        disabled: boolean,
    }>
}

interface queryParams extends ParsedUrlQuery {
    username: string
}

interface BlockedDates  {
    blockedWeekDays: Array<number>
}


type CalendarWeeks = CalendarWeek[]

export function Calendar({ onDateSelected, selectedDate }: CalendarProps) {
    
    const { query } = useRouter()
    const { username } = query as queryParams
    
    const [currentDate, setCurrnetDate] = useState(() => {
        return dayjs().set('date', 1)
    })

    const currentYear = currentDate.get('year')
    const currentMonth = currentDate.get('month')
    
    const { data: blockedDates } = useQuery<BlockedDates>(['bloquedDays', currentYear, currentMonth],async () => {

        const response = await api.get(`/users/${username}/blocked-dates`,{
            params: {
                year: currentYear,
                month: currentMonth,
            }
        })

        return response.data
    })

    const weekdays = getWeekDays({short: true})

    
    const currentMonthFormated = currentDate.format('MMMM')

    const currentYearFormated = currentDate.format('YYYY')
    
    const calendarWeeks = useMemo(() => {
        if(!blockedDates){
            return []
        }


        const daysInMonthArray = Array.from({length: currentDate.daysInMonth()}, (_,index) =>{
            return currentDate.set('date', index + 1)
        })

        const fisrtWeekDay = currentDate.get('day')

        const previousMonthFillArray = Array.from({ length: fisrtWeekDay }, (_,index) =>{
            return currentDate.subtract(index + 1, 'day')
        }).reverse()

        const currentLastDayInMonth = currentDate.set('date', currentDate.daysInMonth())
        const lastWeekDay = currentLastDayInMonth.get('day')

        const nextMonthFillArray = Array.from(
            { length: 7 - (lastWeekDay + 1) }
        , (_, index) => {
            return currentLastDayInMonth.add(index + 1, 'day')
        })


        const calendarDays = [
            ...previousMonthFillArray.map(date => ({
                date,
                disabled: true
            })),
            ...daysInMonthArray.map(date => ({
                date,
                disabled: date.endOf('day').isBefore(new Date())  || 
                !!blockedDates?.blockedWeekDays.includes(date.get('day'))
            })),
            ...nextMonthFillArray.map(date => ({
                date,
                disabled: true
            })),

        ]
     
        const calendarWeeks = calendarDays.reduce<CalendarWeeks>((weeks, current, index, original) => {
            const isWeekStart = index  %  7 === 0

            if (isWeekStart){
                const weekDays = original.slice(index, index + 7)
                const weekDay = index / 7  + 1

                weeks.push({
                    weekDay: Number(weekDay),
                    days: weekDays
                })
            }
            return weeks
        }, [] )

        return calendarWeeks

    }, [currentDate, blockedDates])


    function handleIncreaseMonth() {
        const currentDateIncreased = currentDate.add(1, 'month')
        setCurrnetDate(currentDateIncreased)
    }


    function handleDecreaseMouth() {
        const currentDateDecreased = currentDate.subtract(1, 'month')
        setCurrnetDate(currentDateDecreased)
    }

    return (
        <CalendarContainer>
            <CalendarHeader>
                <CalendarTitle>
                    {currentMonthFormated} <span>{currentYearFormated}</span>
                </CalendarTitle>
                <HeaderActions>
                    <button 
                        title="mês anterior"
                        onClick={handleDecreaseMouth}
                    >
                        <CaretLeft
                            fontSize={20}
                        />
                    </button>
                    <button
                        title="próximo mês"
                        onClick={handleIncreaseMonth}
                    >
                        <CaretRight
                            onClick={handleIncreaseMonth}
                            fontSize={20}
                        />
                    </button>
                </HeaderActions>

            </CalendarHeader>

            <CalendarContent>
                <thead>
                    <tr>
                        {weekdays.map(weekday => (
                            <th key={weekday}>{weekday}.</th>
                        ))}

                    </tr>
                </thead>
                <tbody>
                    {calendarWeeks.map(({days,weekDay})=> (
                        <tr key={weekDay}>
                                {days.map(({ date, disabled}) => (
                                    <td key={date.toISOString()}>
                                        <CalendarDay 
                                            disabled={disabled}
                                            onClick={() => onDateSelected(date.toDate())}
                                        >
                                            {date.get('date')}
                                        </CalendarDay>
                                    </td>
                                ))}
                            

                        </tr>
                    ))}
                </tbody>
            </CalendarContent>

            <CalendarDays>
              
            </CalendarDays>
        </CalendarContainer>
    )
}