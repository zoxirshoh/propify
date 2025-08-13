"use client"

import { Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Home from "./pages/Home/Home"
import Properties from "./pages/Properties/Properties"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Footer from "./components/Footer/Footer"
import LoadingScreen from "./components/LoadingScreen/LoadingScreen"
import { useState, useEffect } from "react"

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for images and content
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
