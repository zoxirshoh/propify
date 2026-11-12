import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Icon from "../Icon/Icon"
import { PROPERTY_TYPES } from "../../data/properties"
import heroMain from "../../assets/images/modern-luxury-house.png"
import heroSide from "../../assets/images/luxury-villa-pool.png"
import heroSmall from "../../assets/images/modern-penthouse-city-view.png"
import "./Hero.css"

const Hero = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState("For Sale")
  const [search, setSearch] = useState({ q: "", type: "", price: "" })

  const update = (e) => setSearch((s) => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ status: mode })
    Object.entries(search).forEach(([k, v]) => v && params.set(k, v))
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">
            <Icon name="star" size={14} filled /> Trusted by 1,500+ families
          </span>
          <h1 className="hero-title">
            Find a home that <span className="text-gradient">fits your life</span>
          </h1>
          <p className="hero-subtitle">
            Propify — simplifying property, amplifying value. Browse verified listings, compare prices and talk to an
            expert agent in minutes.
          </p>

          <form className="hero-search" onSubmit={handleSubmit}>
            <div className="hero-tabs" role="tablist">
              {["For Sale", "For Rent"].map((m) => (
                <button
                  key={m}
                  type="button"
                  role="tab"
                  aria-selected={mode === m}
                  className={`hero-tab ${mode === m ? "is-active" : ""}`}
                  onClick={() => setMode(m)}
                >
                  {m === "For Sale" ? "Buy" : "Rent"}
                </button>
              ))}
            </div>
            <div className="hero-fields">
              <label className="hero-field">
                <span>Location</span>
                <input name="q" value={search.q} onChange={update} placeholder="City, area or title" />
              </label>
              <label className="hero-field">
                <span>Property type</span>
                <select name="type" value={search.type} onChange={update}>
                  <option value="">All types</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="hero-field">
                <span>Budget</span>
                <select name="price" value={search.price} onChange={update}>
                  <option value="">Any price</option>
                  <option value="0-750000">Under $750K</option>
                  <option value="750000-1500000">$750K – $1.5M</option>
                  <option value="1500000+">$1.5M+</option>
                </select>
              </label>
              <button type="submit" className="btn btn-primary hero-submit" aria-label="Search properties">
                <Icon name="search" size={18} /> <span>Search</span>
              </button>
            </div>
          </form>

          <dl className="hero-stats">
            <div>
              <dt>1.5K+</dt>
              <dd>Properties sold</dd>
            </div>
            <div>
              <dt>98%</dt>
              <dd>Happy clients</dd>
            </div>
            <div>
              <dt>15+</dt>
              <dd>Years of experience</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <img className="hero-img hero-img--main" src={heroMain} alt="" />
          <img className="hero-img hero-img--side" src={heroSide} alt="" />
          <img className="hero-img hero-img--small" src={heroSmall} alt="" />
          <div className="hero-float hero-float--top">
            <span className="hero-float-icon">
              <Icon name="shield" size={18} />
            </span>
            <div>
              <strong>Verified listings</strong>
              <small>Every home checked</small>
            </div>
          </div>
          <div className="hero-float hero-float--bottom">
            <div className="hero-avatars">
              <span>S</span>
              <span>M</span>
              <span>A</span>
            </div>
            <div>
              <strong>24/7 Agents</strong>
              <small>Ready to help</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
