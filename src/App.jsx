import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Hero from './page/Hero'
import Succes from './page/Success'
import FeaturedWork from './page/FeaturedWork'
import Service from './page/Service'
import Lagacy from './page/Lagacy'
import New from './page/New'
import Footer from './page/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div> 
  <Hero/>
  <Succes/>
  <FeaturedWork/>
  <Service/>
  <Lagacy/>
  <New/>
  <Footer/>
    </div>
  )
}

export default App
