"use client"

import { useState, useEffect } from "react"
import "./Testimonials.css"
import customerImage1 from "../../assets/images/happy-customer-testimonial.png"
import customerImage2 from "../../assets/images/satisfied-client-portrait.png"
import customerImage3 from "../../assets/images/real-estate-testimonial.png"

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Home Buyer",
      image: customerImage1,
      text: "Domus made our home buying experience incredibly smooth. Their team was professional, knowledgeable, and always available to answer our questions.",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Property Investor",
      image: customerImage2,
      text: "I've worked with many real estate agencies, but Domus stands out for their market expertise and personalized approach. Highly recommended!",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "First-time Buyer",
      image: customerImage3,
      text: "As a first-time buyer, I was nervous about the process. Domus guided me every step of the way and helped me find the perfect home within my budget.",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Real stories from satisfied customers</p>

        <div className="testimonials-slider">
          <div className="testimonials-container" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-image">
                    <img src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-content">
                    <p className="testimonial-text">"{testimonial.text}"</p>
                    <div className="testimonial-author">
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
