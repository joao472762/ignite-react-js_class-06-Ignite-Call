export function covertTimeStringToMinutes(timeString:string){
    const [hours, minutes] = timeString.split(':').map(Number)
    const completeTimeInMinutes = hours * 60 + minutes

    return completeTimeInMinutes

}