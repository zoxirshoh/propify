"use client"

import { useState, useEffect } from "react"
import heroImage from "../../assets/images/modern-city-skyline-panoramic.png"
import "./Hero.css"

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="hero">
      <div className="hero-background">
        <img src={heroImage || "/placeholder.svg"} alt="Modern city skyline" className="hero-bg-image" />
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content">
        <h1 className={`hero-title ${isVisible ? "animate-in" : ""}`}>Domus</h1>
        <p className="hero-subtitle">Find Your Dream Property Today</p>

        <div className="search-container">
          <div className="search-bar">
            <div className="search-field">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" placeholder="Enter city or area" />
            </div>

            <div className="search-field">
              <label htmlFor="price">Price Range</label>
              <select id="price">
                <option value="">Select range</option>
                <option value="0-500000">$0 - $500K</option>
                <option value="500000-1000000">$500K - $1M</option>
                <option value="1000000+">$1M+</option>
              </select>
            </div>

            <div className="search-field">
              <label htmlFor="rooms">Rooms</label>
              <select id="rooms">
                <option value="">Any</option>
                <option value="1">1 Room</option>
                <option value="2">2 Rooms</option>
                <option value="3">3 Rooms</option>
                <option value="4+">4+ Rooms</option>
              </select>
            </div>

            <button className="search-button">Search Properties</button>
          </div>

          <div className="explore-button-container">
            <button className="explore-button">Explore Properties</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
