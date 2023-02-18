export function getWeekDays(){
    const formatter = new Intl.DateTimeFormat('pt-br',{weekday: 'long'})

    function capitalize(text: string){
        const firstLetterInUpperCase = text.substring(0,1).toUpperCase()
        const textCapitalized = firstLetterInUpperCase.concat(text.substring(1))

        return textCapitalized

    }
    return Array.from(Array(7).keys())
        .map(day => formatter.format(Date.UTC(2021,5, day)))
        .map(weekDay => (capitalize(weekDay)))
}