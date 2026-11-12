import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import Icon from "../Icon/Icon"
import teamImage from "../../assets/images/real-estate-team.png"
import "./AboutUs.css"

const stats = [
  { value: 1500, suffix: "+", label: "Properties sold" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 15, suffix: "+", label: "Years experience" },
]

/** Counts up from 0 to `to` once the element scrolls into view. */
const Counter = ({ to, suffix }) => {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const step = (now) => {
          const t = Math.min((now - start) / 1400, 1)
          setValue(Math.round(to * (1 - Math.pow(1 - t, 3))))
          if (t < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to])

  return (
    <span ref={ref}>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  )
}

const points = ["Verified, high-quality listings", "Free property valuation", "Legal & mortgage assistance"]

const AboutUs = () => (
  <section className="section about">
    <div className="container about-grid">
      <div className="about-media">
        <img src={teamImage} alt="The Propify real estate team" loading="lazy" />
        <div className="about-badge">
          <strong>15+</strong>
          <span>years on the market</span>
        </div>
      </div>

      <div className="about-copy">
        <span className="eyebrow">About Propify</span>
        <h2 className="section-title">A partner you can trust with your biggest decision</h2>
        <p className="about-text">
          With over 15 years in the real estate industry, Propify has helped thousands of buyers, sellers and investors
          find the right property. We combine modern technology with deep local market knowledge to make your journey
          smooth and successful.
        </p>
        <ul className="about-points">
          {points.map((p) => (
            <li key={p}>
              <span>
                <Icon name="check" size={14} strokeWidth={3} />
              </span>
              {p}
            </li>
          ))}
        </ul>

        <div className="about-stats">
          {stats.map((s) => (
            <div key={s.label}>
              <strong>
                <Counter to={s.value} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <Link to="/contact" className="btn btn-primary">
          Talk to an expert <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </div>
  </section>
)

export default AboutUs
