import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { QueryClientProvider } from '@tanstack/react-query'

import '@/libs/dayjs'
import '@/styles/global'
import { globalStyles } from '@/styles/global'
import { queryClient } from '@/libs/react-query'


globalStyles()

export default function App({ 
  Component,
  pageProps: { session, ...pageProps },
 }: AppProps) {
  
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://www.url.ie/',
            siteName: 'Ignite Call',
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <Component {...pageProps} />
      </SessionProvider>

    </QueryClientProvider>
  )
}
