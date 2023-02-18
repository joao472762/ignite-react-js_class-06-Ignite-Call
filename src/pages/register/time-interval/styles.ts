import { Box, Button, styled, Text} from "@ignite-ui/react";

export const TimeIntervalContainer = styled('div', {

    maxWidth: 572,
    margin: '$20 auto $4',
    padding: '0 $4',


})


export const IntervalBox = styled(Box, {
    marginTop: '$6',

    'section': {
            borderStyle: 'solid',
            borderColor: '$gray600',
            borderWidth: 1,
            borderRadius: '$sm'
          
    },
    [`> ${Button}`]: {
        width: '100%',
        marginTop: '$4'
    }
})
export const  IntervalItem = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',


    padding: '$4 18px',

    '> div': {
     
    },

    '& + &': {
        borderTopWidth: 1,
        borderTopColor: '$gray600',
        borderTopStyle: 'solid'
    }

    


})

export const IntervalDay = styled('div', {
    display: 'flex',
    alignItems: 'center',
    columnGap: 12,
})

export const IntervalInputs = styled('div', {
    display: 'flex',
    alignItems: 'center',
    columnGap: 8,
    
    'input::-webkit-calendar-picker-indicator':{
        filter: 'invert(100%) brightness(40%)'
    }
})

export const FormError = styled(Text,{
    color: '#f75a68',
    marginTop: '$4'

})
