import '@fontsource/poppins'
import '@fontsource/poppins/500.css'
import '../styles/globals.css'
import '../styles/typography.css'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
