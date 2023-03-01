import { styled, Box, Heading, Text } from "@ignite-ui/react"

export const CalendarContainer  = styled(Box, {
   
    borderWidth: 0,
    borderRadius: '$px',
    borderRightWidth: 1
})

export const CalendarHeader = styled('div', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',   
})

export const CalendarTitle = styled(Text, {
    color: '$white',
    fontWeight: '$medium',
    textTransform: 'capitalize',

    'span':{
          color: '$gray200',
   
        
    }
 
})



export const HeaderActions = styled(Heading, {
    display: 'flex',
    columnGap: '$2',
    'button': {
        all: 'unset',
        color: 'gray200',    
        lineHeight: 0,


        cursor: 'pointer',
        borderRadius: '$sm',
        
        '&:hover': {
            color: 'white',
        }, 

        '&:focus': {
            boxShadow: '0px 0px 0px 2px $colors$gray100'

        },

        '&:disabled': {
            cursor: 'not-allowed',
            color: 'gray600'
        },
    }
})

export const WeekDays = styled('section', {
    display: 'grid',
    gap: '$2',
    width: '100%',
    marginTop: '$6',

    gridTemplateColumns: 'repeat(auto-fit, minmax(63px, 1fr) )',
})

export const CalendarDays = styled('main', {
    display: 'grid',
    gap: '$2',
    width: '100%',
    marginTop: '$6',

    gridTemplateColumns: 'repeat(auto-fit, minmax(63px, 1fr) )',
})

export const CalendarContent = styled('table',{
    width: '100%',
   
    fontFamily: '$default',
    tableLayout: 'fixed',
    marginTop: '$6',
    borderSpacing: '0.25rem',

    'thead th': {
        color: '$gray100',
        fontWeight: '$medium',
        fontSize: '$sm'
    },
    'tbody:before': {
           content: "",
            paddingBottom: "0.75rem",
            display: "block",
    },

    'tbody td': {
        boxSizing: 'border-box',
    }
})

export const CalendarDay = styled('button', {
    all: 'undset',
    
    background: '$gray600',
    boxSizing: 'border-box',
    color: '$gray100',
    borderRadius: '$md',
    width: '100%',
    aspectRatio: '1 / 1',
    textAlign: 'center',

    border: '1px solid  $gray600',
    fontFamily: '$default',
    cursor: 'pointer',

    '&:disabled': {
        cursor: 'default',
        backgroundColor: 'none',
        opacity: 0.4
    },

    '&:not(:disabled):hover': {
        background: '$gray500'
    },

    '&:hover': {
        borderWidth: 2,
        borderColor: '$gray400',
    }

})
