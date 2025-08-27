"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./PropertyDetail.css"

const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
      yearBuilt: 2020,
      parking: 2,
      images: [
        "/modern-luxury-downtown-apartment.png",
        "/luxury-apartment-living-room.png",
        "/modern-kitchen.png",
        "/luxury-bedroom.png",
      ],
      coordinates: { lat: 40.7589, lng: -73.9851 },
      description:
        "Experience luxury living in this stunning modern apartment located in the heart of Downtown Manhattan. This beautifully designed 3-bedroom, 2-bathroom residence offers breathtaking city views and premium finishes throughout.",
      features: [
        "Floor-to-ceiling windows",
        "Hardwood floors",
        "Stainless steel appliances",
        "In-unit washer/dryer",
        "Central air conditioning",
        "Balcony with city views",
        "24/7 doorman",
        "Fitness center",
        "Rooftop terrace",
      ],
      agent: {
        name: "Sarah Johnson",
        phone: "+1 (555) 123-4567",
        email: "sarah@propify.com",
        image: "/professional-woman-realtor.png",
      },
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
      yearBuilt: 2018,
      parking: 2,
      images: [
        "/contemporary-brooklyn-house.png",
        "/contemporary-house-exterior.png",
        "/modern-living-room.png",
        "/spacious-kitchen.png",
      ],
      coordinates: { lat: 40.6962, lng: -73.9961 },
      description:
        "Beautiful contemporary house in the prestigious Brooklyn Heights neighborhood. This spacious 4-bedroom home features modern design elements and high-end finishes throughout.",
      features: [
        "Open floor plan",
        "Gourmet kitchen",
        "Master suite with walk-in closet",
        "Private backyard",
        "Two-car garage",
        "Smart home technology",
        "Energy-efficient appliances",
        "Hardwood floors",
        "Fireplace",
      ],
      agent: {
        name: "Michael Chen",
        phone: "+1 (555) 987-6543",
        email: "michael@propify.com",
        image: "/professional-realtor.png",
      },
    },
    // Add more properties with similar structure...
  ]

  useEffect(() => {
    setTimeout(() => {
      const foundProperty = mockProperties.find((p) => p.id === Number.parseInt(id))
      setProperty(foundProperty)
      setLoading(false)
    }, 800)
  }, [id])

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
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
      <div className="property-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading property details...</p>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property Not Found</h2>
        <p>The property you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/properties")} className="back-btn">
          Back to Properties
        </button>
      </div>
    )
  }

  return (
    <div className="property-detail">
      <button onClick={() => navigate("/properties")} className="back-button">
        ← Back to Properties
      </button>

      <div className="property-gallery">
        <div className="main-image">
          <img src={property.images[currentImageIndex] || "/placeholder.svg"} alt={property.title} />
          <button className="gallery-btn prev-btn" onClick={prevImage}>
            ‹
          </button>
          <button className="gallery-btn next-btn" onClick={nextImage}>
            ›
          </button>
        </div>
        <div className="image-thumbnails">
          {property.images.map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`${property.title} ${index + 1}`}
              className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="property-info">
        <div className="property-header">
          <div className="property-main-info">
            <h1 className="property-title">{property.title}</h1>
            <p className="property-location">📍 {property.location}</p>
            <div className="property-price">{formatPrice(property.price)}</div>
          </div>
          <div className="property-type-badge">{property.type}</div>
        </div>

        <div className="property-stats">
          <div className="stat">
            <span className="stat-icon">🛏️</span>
            <span className="stat-value">{property.bedrooms}</span>
            <span className="stat-label">Bedrooms</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🚿</span>
            <span className="stat-value">{property.bathrooms}</span>
            <span className="stat-label">Bathrooms</span>
          </div>
          <div className="stat">
            <span className="stat-icon">📐</span>
            <span className="stat-value">{property.area}</span>
            <span className="stat-label">Sq Ft</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🏗️</span>
            <span className="stat-value">{property.yearBuilt}</span>
            <span className="stat-label">Year Built</span>
          </div>
          <div className="stat">
            <span className="stat-icon">🚗</span>
            <span className="stat-value">{property.parking}</span>
            <span className="stat-label">Parking</span>
          </div>
        </div>

        <div className="property-description">
          <h2>Description</h2>
          <p>{property.description}</p>
        </div>

        <div className="property-features">
          <h2>Features & Amenities</h2>
          <div className="features-grid">
            {property.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-check">✓</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="property-agent">
          <h2>Contact Agent</h2>
          <div className="agent-card">
            <img src={property.agent.image || "/placeholder.svg"} alt={property.agent.name} className="agent-photo" />
            <div className="agent-info">
              <h3>{property.agent.name}</h3>
              <p className="agent-contact">📞 {property.agent.phone}</p>
              <p className="agent-contact">✉️ {property.agent.email}</p>
            </div>
            <div className="agent-actions">
              <button className="contact-btn primary">Call Now</button>
              <button className="contact-btn secondary">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
