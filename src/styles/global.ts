import {globalCss} from '@ignite-ui/react'

export const globalStyles = globalCss({
    '*': {
        boxSizing: 'border-box',
        padding: 0,
        margin: 0,
    },
    'body': {
        fontFamily: '$default',
        '-webkit-font-smoothing': 'antialiased',  
        background: '$gray900',
        color: '$gray100'
    }
})