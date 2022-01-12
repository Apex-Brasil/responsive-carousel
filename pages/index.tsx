import { Carousel } from '@/components'
import { useTheme } from 'next-themes'
import Head from 'next/head'

const Home = () => {
  // const { resolvedTheme, setTheme } = useTheme()

  return (
    <>
    <Head>
      <title>Responsive Carousel</title>
      <meta name="description" content="A Responsive Carousel code snippet" />
    </Head>
     
    <div>
      {/* <button
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        click here to change the theme
      </button> */}

      <Carousel/>
    </div>
    </>
  )
}

export default Home
