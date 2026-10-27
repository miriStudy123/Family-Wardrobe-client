import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Login from './components/login'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <>
    <Header/>
    <Outlet/>
    
     
    </>
  )
}

export default App
