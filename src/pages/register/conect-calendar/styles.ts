import { Box, Button, styled, Text } from "@ignite-ui/react";

export const ConenctCalendarContainer = styled('div',{
    maxWidth: 572,
    margin: '$20 auto $4',
    padding: '0 $4',

    [`> ${Box}`]: {
        marginTop: '$6',
        
        [`> ${Button}`]: {
            width: '100%',
            marginTop: '$4'
        }
    }
})


export const ConnectBox = styled(Box, {
    marginTop: '$6',
        
    [`> ${Button}`]: {
        marginTop: '$4'
    }
})


export const ConnectArea = styled('div',{
    border: '1px solid $gray600',
    padding: '$4 $8',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '$md',

    [`> ${Text}`]: {
        fontWeight: '$medium'
    }
})

export const AuthError = styled(Text,{
    color: '#f75a68',
    marginBottom: '$4',
    marginTop: '$4'
})