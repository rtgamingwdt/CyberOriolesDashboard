import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps }: {Component: any, pageProps: any}) {
      
  return (
    <div className='w-screen h-screen bg-orange-600 font-[poppins]' id='root'>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  )
}

export default MyApp
