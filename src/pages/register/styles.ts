import { MultiStep, styled, Text, Box} from "@ignite-ui/react";

export const RegisterContainer = styled('main', {
    maxWidth: 572,
    margin: '$20 auto $4',
    padding: '0 $4'
})

export const Header = styled('header', {
    padding: '0 $6',

    [`> ${Text}`]: {
        color: '$gray200',
        marginBottom: '$6',
        marginTop: '$2',
        display: 'block'
    },
})

export const RegisterForm = styled(Box, {
    marginTop: '$6',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '$4',

    label: {
        [`> ${Text}`]: {
            display: 'block',
            marginBottom: '$2', 
        }
    }
})

export const FormError = styled(Text,{
    color: '#f75a68',
    marginTop: '$1'

})

