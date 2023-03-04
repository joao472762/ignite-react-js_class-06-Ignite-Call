import { styled, Box, Heading, Text } from "@ignite-ui/react"

export const CalendarStepContainer = styled(Box, {
    display: 'grid',


    padding: 0,
  
    position: 'relative',
   
    

    variants: {
        isTimePickerOpen: {
            true: {
                gridTemplateColumns: '1fr 17.5rem',
                
                '@media(max-width:900px)': {
                    gridTemplateColumns: '1fr',
                }
            },
            false: {
                gridTemplateColumns: '1fr',
                width: 570,
            }
        }
    },
    defaultVariants: {
        isTimePickerOpen: false
    }

    
    
})



export const DatePicker = styled('aside', {
    padding: '$6 $6 0',
    width: '100%',
    overflowX: 'auto',
    maxHeight: 340,
    paddingBottom: '$4'

})

export const TimePickerList = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
    marginTop: '$3',

    'button': {
        all: 'unset',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '$gray600',
        width: '100%',
        borderRadius: '$sm',
       
        height: '2.375rem',

        fontFamily: '$default',
        color: '$gray100',
        fontSize: '$sm',
        cursor: 'pointer',

        '&:not(:disabled):hover': {
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

export const TimePickerItem = styled('button', {
    all: 'unset',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '$gray600',
    width: '100%',
    borderRadius: '$sm',

    height: '2.375rem',

    fontFamily: '$default',
    color: '$gray100',
    fontSize: '$sm',
    cursor: 'pointer',

    '&:not(:disabled):hover': {
        color: 'white',
    },

    '&:focus': {

        boxShadow: '0px 0px 0px 2px $colors$gray100'

    },

    '&:disabled': {
        cursor: 'not-allowed',
        color: 'gray600',
        opacity: .6,
    },


})

export const TimePickerHeader = styled('p', {
    color: '$white',
    fontWeight: '$medium',

    'span': {
        color: '$gray200',


    }
})
