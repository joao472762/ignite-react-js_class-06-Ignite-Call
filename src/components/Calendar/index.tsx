import { useState } from "react";
import { CaretLeft, CaretRight } from "phosphor-react";
import { addMonths, format, lastDayOfMonth as getLastDayOfMonth, subMonths } from "date-fns";

import { Text } from "@ignite-ui/react";
import { formatMouth } from "@/utils/formatDate";
import { getWeekDays } from "@/utils/getWeekDays";
import { CalendarTitle, HeaderActions, CalendarContent, WeekDays, CalendarDays, CalendarHeader, CalendarDay, CalendarBody } from "./styles";


interface CalendarProps {
    updatedSelectedDate: (date: Date) => void
}

export function Calendar({ updatedSelectedDate }: CalendarProps) {

    const [currentMouth, setCurrentMouth] = useState(new Date)

    const lastDayOfMonth = getLastDayOfMonth(currentMouth).getDate()
    const weekdays = getWeekDays({short: true})

    const firstDayOfMouth = new Date(currentMouth.getFullYear(), currentMouth.getMonth(), 1)
    const firstWeekDayOfMounth = Number(format(firstDayOfMouth, 'i'))


    function handleIncreaseMonth() {
        const monthIncreasd = addMonths(currentMouth, 1)
        setCurrentMouth(monthIncreasd)
    }


    function handleDecreaseMouth() {
        const monthDecresed = subMonths(currentMouth, 1)
        setCurrentMouth(monthDecresed)
    }

    function handleUpdatedSelectedDate(day: number){
        const dateSelected = new Date(currentMouth.getFullYear(), currentMouth.getMonth(), day)
        updatedSelectedDate(dateSelected)
    }

    return (
        <CalendarContent>
            <CalendarHeader>
                <CalendarTitle>
                    {formatMouth.format(currentMouth)} <span>{currentMouth.getFullYear()}</span>
                </CalendarTitle>
                <HeaderActions>
                    <button>
                        <CaretLeft
                            onClick={handleDecreaseMouth}
                            fontSize={20}
                        />
                    </button>
                    <button>
                        <CaretRight
                            onClick={handleIncreaseMonth}
                            fontSize={20}
                        />
                    </button>
                </HeaderActions>

            </CalendarHeader>

            <CalendarBody>
                <thead>
                    <tr>
                        {weekdays.map(weekday => (
                            <th key={weekday}>{weekday}.</th>
                        ))}

                    </tr>
                </thead>
            </CalendarBody>

            <CalendarDays>
                {Array.from(Array(firstWeekDayOfMounth).keys()).map(weekDay => (
                    <Text
                        key={weekDay}
                    ></Text>
                ))}
                {
                    //genereta a date
                    Array.from({ length: lastDayOfMonth}, (_, index) => index + 1).map(monthday => (
                       
                        <CalendarDay
                            onClick={() => handleUpdatedSelectedDate(monthday)}
                            key={monthday}
                        >
                            {monthday}
                        </CalendarDay >
                       
                    ))
                }
            </CalendarDays>
        </CalendarContent>
    )
}