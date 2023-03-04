import { Box, styled, Text } from "@ignite-ui/react"

export const ConfirmStepContainer = styled(Box,{
    width: "100%",
    maxWidth: 540,
})

export const ConfirmStepHeader = styled('div',{
    display: 'flex',
    gap: '$4',

   [`> ${Text}`]: {
     display: 'flex',
        alignItems: 'center',
        columnGap: '$2',
   }
   ,
    'svg': {
        width: '$5',
        height: '$5',

        color: '$gray400'
    }
})

export const FormError = styled(Text,{
    color: '#f75a68',
    marginTop: '$1'

})

export const FormFields = styled('div',{
    width: '100%',

    marginTop: '$6',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '$6',
    paddingTop: '$6',
    borderTop: '2px solid $gray600',

    'label': {
        display: 'flex',
        flexDirection: 'column',
        gap: '$2',
    }
})

export const ConfirmStepFooter = styled('footer', {
    display: 'flex',
    rowGap: '$2',
    justifyContent: 'flex-end',
    marginTop: '$6',
    gap: '$2',
})