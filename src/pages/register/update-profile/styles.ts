import { styled, Text, Box, TextArea} from "@ignite-ui/react";

export const UpadeteProfileContainer = styled('div',{
    maxWidth: 572,
    margin: '$20 auto $4',
    padding: '0 $4',
})

export const FormAnotation = styled(Text,{
    color: '$gray200'
})

export const ProfileBox   = styled(Box, {
    width: '100%',
    display: 'flex',
    flexDirection:  'column',
    rowGap: '$4',
    marginTop: '$6',

    'label': {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        rowGap: '$2'

        
    }
})




export const AboutMe = styled('section',{
    width: '100%',
    marginTop: '$4',

    'label': {
        [`> ${TextArea}`]: {
           width: '100%',
       }

    }
})

