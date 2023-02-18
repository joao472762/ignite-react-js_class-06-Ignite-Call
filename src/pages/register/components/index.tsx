import { styled, Text } from "@ignite-ui/react";

export const Header = styled('header', {
    padding: '0 $6',

    [`> ${Text}`]: {
        color: '$gray200',
        marginBottom: '$6',
        marginTop: '$2',
        display: 'block'
    },


})

export const FormError = styled(Text, {
    marginBottom: '$2',
    color: '#f75a68'
})
