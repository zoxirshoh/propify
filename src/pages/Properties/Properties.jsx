"use client"

import { useState, useEffect } from "react"
import "./Properties.css"
import { Link } from "react-router-dom"

const Properties = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [filters, setFilters] = useState({
    location: "",
    priceRange: "",
    propertyType: "",
    sortBy: "price-low",
  })
  const [loading, setLoading] = useState(true)

  const mockProperties = [
    {
      id: 1,
      title: "Modern Luxury Apartment",
      location: "Downtown Manhattan",
      price: 850000,
      type: "Apartment",
      bedrooms: 3,
      bathrooms: 2,
      area: 1200,
      image: "/modern-luxury-downtown-apartment.png",
      coordinates: { lat: 40.7589, lng: -73.9851 },
    },
    {
      id: 2,
      title: "Contemporary House",
      location: "Brooklyn Heights",
      price: 1200000,
      type: "House",
      bedrooms: 4,
      bathrooms: 3,
      area: 1800,
      image: "/contemporary-brooklyn-house.png",
      coordinates: { lat: 40.6962, lng: -73.9961 },
    },
    {
      id: 3,
      title: "Luxury Villa",
      location: "Queens Village",
      price: 950000,
      type: "Villa",
      bedrooms: 5,
      bathrooms: 4,
      area: 2200,
      image: "/luxury-villa-queens.png",
      coordinates: { lat: 40.7282, lng: -73.7949 },
    },
    {
      id: 4,
      title: "Modern Penthouse",
      location: "Upper East Side",
      price: 2500000,
      type: "Penthouse",
      bedrooms: 4,
      bathrooms: 3,
      area: 1600,
      image: "/modern-penthouse-ues.png",
      coordinates: { lat: 40.7736, lng: -73.9566 },
    },
    {
      id: 5,
      title: "Elegant Townhouse",
      location: "Greenwich Village",
      price: 1800000,
      type: "Townhouse",
      bedrooms: 3,
      bathrooms: 2,
      area: 1400,
      image: "/elegant-greenwich-townhouse.png",
      coordinates: { lat: 40.7335, lng: -74.0027 },
    },
    {
      id: 6,
      title: "Waterfront Condo",
      location: "Battery Park",
      price: 1100000,
      type: "Condo",
      bedrooms: 2,
      bathrooms: 2,
      area: 1000,
      image: "/waterfront-condo-battery-park.png",
      coordinates: { lat: 40.7033, lng: -74.017 },
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setProperties(mockProperties)
      setFilteredProperties(mockProperties)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = [...properties]

    if (filters.location) {
      filtered = filtered.filter((property) => property.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number)
      filtered = filtered.filter((property) => property.price >= min && (max ? property.price <= max : true))
    }

    if (filters.propertyType) {
      filtered = filtered.filter((property) => property.type === filters.propertyType)
    }

    // Sort properties
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "area-large":
          return b.area - a.area
        case "area-small":
          return a.area - b.area
        default:
          return 0
      }
    })

    setFilteredProperties(filtered)
  }, [filters, properties])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="properties-loading">
        <div className="loading-container">
          <div className="loading-house">
            <div className="house-base"></div>
            <div className="house-roof"></div>
            <div className="house-door"></div>
            <div className="house-windows">
              <div className="window"></div>
              <div className="window"></div>
            </div>
            <div className="house-chimney"></div>
          </div>
          <div className="loading-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <p className="loading-text">Qidirilmoqda...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="properties-page">
      <div className="properties-header">
        <div className="properties-hero">
          <h1 className="properties-title">Premium Properties</h1>
          <p className="properties-subtitle">Discover your dream home from our exclusive collection</p>
        </div>
      </div>

      <div className="properties-filters">
        <div className="filters-container">
          <div className="filter-group">
            <label>Location</label>
            <input
              type="text"
              placeholder="Search by location..."
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label>Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="filter-select"
            >
              <option value="">All Prices</option>
              <option value="0-1000000">Under $1M</option>
              <option value="1000000-1500000">$1M - $1.5M</option>
              <option value="1500000-2000000">$1.5M - $2M</option>
              <option value="2000000-999999999">Above $2M</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Property Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => handleFilterChange("propertyType", e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Condo">Condo</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="filter-select"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="area-large">Area: Largest First</option>
              <option value="area-small">Area: Smallest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="properties-grid">
        <div className="properties-container">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <div key={property.id} className="property-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="property-image">
                  <img src={property.image || "/placeholder.svg"} alt={property.title} />
                  <div className="property-badge">{property.type}</div>
                </div>
                <div className="property-content">
                  <h3 className="property-title">{property.title}</h3>
                  <p className="property-location">📍 {property.location}</p>
                  <div className="property-details">
                    <span>🛏️ {property.bedrooms} beds</span>
                    <span>🚿 {property.bathrooms} baths</span>
                    <span>📐 {property.area} sq ft</span>
                  </div>
                  <div className="property-price">{formatPrice(property.price)}</div>
                  <Link to={`/property/${property.id}`} className="property-btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-properties">
              <h3>No properties found</h3>
              <p>Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Properties
