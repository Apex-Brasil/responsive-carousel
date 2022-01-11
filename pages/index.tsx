import { Card } from '@/components'
import { useTheme } from 'next-themes'

const Home = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div>
      <button
        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      >
        click here to change the theme
      </button>

      <div className="container mt-10 text-center max-w-[90ch]">
        <Card></Card>
        <h1>Sphinx of black quartz</h1>
        <h2>Sphinx of black quartz</h2>
        <h3>Sphinx of black quartz</h3>
        <h4>Sphinx of black quartz</h4>
        <p className="text-margin">
          lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
          amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip
          lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
          amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip
          lorem ipsum dolor sit amet, consectetur adip
        </p>
        <p className="text-margin">
          lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
          amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip
          lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
          amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip
          lorem ipsum dolor sit amet, consectetur adip
        </p>
        <p className="text-margin">
          lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
          amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip
          lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
          amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip
          lorem ipsum dolor sit amet, consectetur adip
        </p>
        <p className="text-margin">
          lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
          amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip
          lorem ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit
          amet, consectetur adip lorem ipsum dolor sit amet, consectetur adip
          lorem ipsum dolor sit amet, consectetur adip
        </p>
      </div>
    </div>
  )
}

export default Home
