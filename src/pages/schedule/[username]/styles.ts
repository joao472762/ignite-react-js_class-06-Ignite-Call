import { Text,styled, Heading, Box } from "@ignite-ui/react";

export const ScheduleContainer = styled('div',{
    maxWidth: 852,
    
    margin: '$20 auto $4',
    padding: '0 $4',
})

export const Header = styled('header',{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [`> ${Heading}`]:{
        lineHeight: '$base'
    },
    
    [`> ${Text}`]:{
        color: '$gray200'
    }

})

export const Title = styled(Heading, {
    marginTop: '$2'

})




