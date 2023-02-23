interface getWeekDaysProps{
    short?: boolean
}

export function getWeekDays({short=false}: getWeekDaysProps  = {}){
    const formatter = new Intl.DateTimeFormat('pt-br',{weekday: 'long'})

    function capitalize(text: string){
        const firstLetterInUpperCase = text.substring(0,1).toUpperCase()
        const textCapitalized = firstLetterInUpperCase.concat(text.substring(1))
        return textCapitalized

    }
    
    const weekDays = Array.from(Array(7).keys()).map(day => formatter.format(Date.UTC(2021,5, day)))

    if(short){
        return weekDays.map(day => day.slice(0, 3).toUpperCase())
    }

    return  weekDays.map(weekDay => (capitalize(weekDay)))
}