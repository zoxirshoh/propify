import { useEffect, useState } from "react"
import Icon from "../Icon/Icon"
import customerImage1 from "../../assets/images/happy-customer-testimonial.png"
import customerImage2 from "../../assets/images/satisfied-client-portrait.png"
import customerImage3 from "../../assets/images/real-estate-testimonial.png"
import "./Testimonials.css"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Home Buyer",
    image: customerImage1,
    text: "Propify made our home buying experience incredibly smooth. The team was professional, knowledgeable and always available to answer our questions.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Property Investor",
    image: customerImage2,
    text: "I've worked with many agencies, but Propify stands out for their market expertise and personal approach. Highly recommended!",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "First-time Buyer",
    image: customerImage3,
    text: "As a first-time buyer I was nervous about the process. Propify guided me every step of the way and found the perfect home within my budget.",
  },
]

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = testimonials.length

  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => setCurrent((c) => (c + 1) % count), 6000)
    return () => clearInterval(timer)
  }, [paused, count, current])

  const go = (dir) => setCurrent((c) => (c + dir + count) % count)

  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-title">What our clients say</h2>
          <p className="section-subtitle">Real stories from people who found their home with us.</p>
        </div>

        <div className="t-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="t-track" style={{ transform: `translateX(-${current * 100}%)` }}>
            {testimonials.map((t, i) => (
              <figure key={t.id} className="t-slide" aria-hidden={i !== current}>
                <div className="t-card">
                  <img src={t.image} alt={t.name} className="t-image" loading="lazy" />
                  <div className="t-content">
                    <Icon name="quote" size={36} className="t-quote" filled strokeWidth={0} />
                    <div className="t-stars" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }, (_, s) => (
                        <Icon key={s} name="star" size={16} filled strokeWidth={0} />
                      ))}
                    </div>
                    <blockquote>{t.text}</blockquote>
                    <figcaption>
                      <strong>{t.name}</strong>
                      <span>{t.role}</span>
                    </figcaption>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="t-controls">
          <button type="button" className="icon-btn t-arrow" onClick={() => go(-1)} aria-label="Previous testimonial">
            <Icon name="chevronLeft" />
          </button>
          <div className="t-dots">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className={`t-dot ${i === current ? "is-active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button type="button" className="icon-btn t-arrow" onClick={() => go(1)} aria-label="Next testimonial">
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
