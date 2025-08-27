"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Hero.css"

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [searchData, setSearchData] = useState({
    location: "",
    price: "",
    rooms: "",
  })
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSearch = () => {
    if (!searchData.location && !searchData.price && !searchData.rooms) {
      alert("Please select at least one search criteria")
      return
    }

    const searchParams = new URLSearchParams()
    if (searchData.location) searchParams.set("location", searchData.location)
    if (searchData.price) searchParams.set("price", searchData.price)
    if (searchData.rooms) searchParams.set("rooms", searchData.rooms)

    navigate(`/properties?${searchParams.toString()}`)
  }

  const handleExploreProperties = () => {
    navigate("/properties")
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="brand-section">
          <h1 className={`hero-title ${isVisible ? "animate-in" : ""}`}>
            {"PROPIFY".split("").map((letter, i) => (
              <span
                key={i}
                className={`letter ${isVisible ? "animate-letter" : ""}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className={`hero-subtitle ${isVisible ? "animate-in-delayed" : ""}`}>Place where you can find Your Dream House</p>
        </div>

        <div className={`search-container ${isVisible ? "animate-in-search" : ""}`}>
          <div className="search-bar">
            <div className="search-field animate-field-1">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                placeholder="Enter city or area"
                value={searchData.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="search-field animate-field-2">
              <label htmlFor="price">Price Range</label>
              <select id="price" value={searchData.price} onChange={handleInputChange}>
                <option value="">Select range</option>
                <option value="0-500000">$0 - $500K</option>
                <option value="500000-1000000">$500K - $1M</option>
                <option value="1000000+">$1M+</option>
              </select>
            </div>

            <div className="search-field animate-field-3">
              <label htmlFor="rooms">Rooms</label>
              <select id="rooms" value={searchData.rooms} onChange={handleInputChange}>
                <option value="">Any</option>
                <option value="1">1 Room</option>
                <option value="2">2 Rooms</option>
                <option value="3">3 Rooms</option>
                <option value="4+">4+ Rooms</option>
              </select>
            </div>

            <button className="search-button animate-button" onClick={handleSearch}>
              <span>🔍 Search Properties</span>
              <div className="button-ripple"></div>
            </button>
          </div>

          <div className="explore-button-container">
            <button className="explore-button" onClick={handleExploreProperties}>
              <span>🏠 Explore All Properties</span>
              <div className="explore-arrow">→</div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
