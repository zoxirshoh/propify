"use client"

import { useState, useEffect } from "react"
import "./FeaturedProperties.css"
import modernLuxuryHouse from "../../assets/images/modern-luxury-house.png"
import contemporaryApartment from "../../assets/images/contemporary-apartment-building.png"
import luxuryVilla from "../../assets/images/luxury-villa-pool.png"

const FeaturedProperties = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const properties = [
    {
      id: 1,
      image: modernLuxuryHouse,
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      price: "$2,500,000",
      beds: 4,
      baths: 3,
      area: "3,200 sq ft",
    },
    {
      id: 2,
      image: contemporaryApartment,
      title: "Contemporary Apartment",
      location: "Manhattan, NY",
      price: "$1,800,000",
      beds: 3,
      baths: 2,
      area: "2,100 sq ft",
    },
    {
      id: 3,
      image: luxuryVilla,
      title: "Luxury Villa with Pool",
      location: "Miami, FL",
      price: "$3,200,000",
      beds: 5,
      baths: 4,
      area: "4,500 sq ft",
    },
  ]

  const SkeletonCard = () => (
    <div className="property-card skeleton">
      <div className="skeleton-image"></div>
      <div className="property-info">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-location"></div>
        <div className="skeleton-line skeleton-price"></div>
        <div className="property-details">
          <div className="skeleton-line skeleton-detail"></div>
          <div className="skeleton-line skeleton-detail"></div>
          <div className="skeleton-line skeleton-detail"></div>
        </div>
      </div>
    </div>
  )

  return (
    <section className="featured-properties">
      <div className="container">
        <h2 className="section-title">Featured Properties</h2>
        <p className="section-subtitle">Discover our handpicked selection of premium properties</p>

        <div className="properties-grid">
          {loading
            ? Array(3)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />)
            : properties.map((property) => (
                <div key={property.id} className="property-card">
                  <div className="property-image">
                    <img src={property.image || "/placeholder.svg"} alt={property.title} />
                    <div className="property-overlay">
                      <button className="view-details">View Details</button>
                    </div>
                  </div>
                  <div className="property-info">
                    <h3 className="property-title">{property.title}</h3>
                    <p className="property-location">📍 {property.location}</p>
                    <p className="property-price">{property.price}</p>
                    <div className="property-details">
                      <span>🛏️ {property.beds} beds</span>
                      <span>🚿 {property.baths} baths</span>
                      <span>📐 {property.area}</span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties
