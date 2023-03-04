import { useState } from "react";
import { CalendarStep } from "./CalendarStep";
import { ConfirmStep } from "./ConfirmStep";


export function ScheduleForm(){
    const [selectedDateTime,setSelectedDateTime] = useState<null | Date>(null) 
    const hasSelectedDateTime = !!selectedDateTime

    function handleSelectedDateTime(date: Date){
        setSelectedDateTime(date)
    }

    function clearSelectedDateTime(){
        setSelectedDateTime(null)
    }

    if (hasSelectedDateTime){
        return (
            <ConfirmStep 
                schedulingDate={selectedDateTime}
                clearSelectedDateTime={clearSelectedDateTime}
            />
        )
    }
    
    return (
        <CalendarStep
            onSelectDateTime={handleSelectedDateTime}
        />
    )



}
