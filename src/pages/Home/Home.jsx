"use client"

import { useState, useEffect } from "react"
import Hero from "../../components/Hero/Hero"
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs"
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties"
import AboutUs from "../../components/AboutUs/AboutUs"
import Testimonials from "../../components/Testimonials/Testimonials"
import CallToAction from "../../components/CallToAction/CallToAction"
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen"

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem("hasVisited")

    if (!hasVisited) {
      setIsLoading(true)
      // Mark as visited for this session
      sessionStorage.setItem("hasVisited", "true")

      // Hide loading after 1.5 seconds
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <FeaturedProperties />
      <AboutUs />
      <Testimonials />
      <CallToAction />
    </main>
  )
}

export default Home
