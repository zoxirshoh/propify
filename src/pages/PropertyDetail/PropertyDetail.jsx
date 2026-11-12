import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Icon from "../../components/Icon/Icon"
import PropertyCard from "../../components/PropertyCard/PropertyCard"
import MortgageCalculator from "../../components/MortgageCalculator/MortgageCalculator"
import { getPropertyById, properties } from "../../data/properties"
import { useApp } from "../../context/app-context"
import { formatNumber, formatPrice } from "../../utils/format"
import "./PropertyDetail.css"

const AgentForm = ({ property }) => {
  const { notify, user } = useApp()
  const [form, setForm] = useState({
    name: user?.fullName ?? "",
    phone: "",
    message: `Hi, I'm interested in "${property.title}". Please contact me.`,
  })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: "" }))
  }

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = "Please enter your name"
    if (!/^\+?[\d\s()-]{7,}$/.test(form.phone)) next.phone = "Please enter a valid phone number"
    if (Object.keys(next).length) return setErrors(next)

    setSending(true)
    setTimeout(() => {
      setSending(false)
      setForm((f) => ({ ...f, phone: "" }))
      notify(`Message sent to ${property.agent.name}`)
    }, 900)
  }

  return (
    <form className="agent-form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="a-name">Your name</label>
        <input id="a-name" name="name" className={`input ${errors.name ? "has-error" : ""}`} value={form.name} onChange={update} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>
      <div className="field">
        <label htmlFor="a-phone">Phone</label>
        <input
          id="a-phone"
          name="phone"
          type="tel"
          placeholder="+998 90 123 45 67"
          className={`input ${errors.phone ? "has-error" : ""}`}
          value={form.phone}
          onChange={update}
        />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>
      <div className="field">
        <label htmlFor="a-msg">Message</label>
        <textarea id="a-msg" name="message" rows={3} className="input" value={form.message} onChange={update} />
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
        {sending ? <span className="spinner" /> : <Icon name="send" size={16} />} Send message
      </button>
    </form>
  )
}

const PropertyDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite, notify } = useApp()
  const property = getPropertyById(id)
  const [imageIndex, setImageIndex] = useState(0)

  // Reset gallery when navigating to another property.
  const [lastId, setLastId] = useState(id)
  if (lastId !== id) {
    setLastId(id)
    setImageIndex(0)
  }

  const count = property?.images.length ?? 0
  const step = useCallback((dir) => setImageIndex((i) => (i + dir + count) % count), [count])

  useEffect(() => {
    if (!property) return
    document.title = `${property.title} — Propify`
    const onKey = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.title = "Propify — Premium Real Estate"
    }
  }, [property, step])

  if (!property) {
    return (
      <div className="container detail-missing">
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Property not found</h3>
          <p>The property you're looking for doesn't exist or was removed.</p>
          <Link to="/properties" className="btn btn-primary">
            Back to properties
          </Link>
        </div>
      </div>
    )
  }

  const fav = isFavorite(property.id)
  const isRent = property.status === "For Rent"
  const similar = properties
    .filter((p) => p.id !== property.id)
    .sort((a, b) => (b.type === property.type) - (a.type === property.type) || Math.abs(a.price - property.price) - Math.abs(b.price - property.price))
    .slice(0, 3)

  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, url })
      } else {
        await navigator.clipboard.writeText(url)
        notify("Link copied to clipboard")
      }
    } catch (err) {
      if (err?.name !== "AbortError") notify("Could not share this link", "error")
    }
  }

  const stats = [
    { icon: "bed", value: property.bedrooms, label: "Bedrooms" },
    { icon: "bath", value: property.bathrooms, label: "Bathrooms" },
    { icon: "area", value: `${formatNumber(property.area)} ft²`, label: "Living area" },
    { icon: "calendar", value: property.yearBuilt, label: "Year built" },
    { icon: "car", value: property.parking || "—", label: "Parking" },
  ]

  return (
    <div className="detail container">
      <div className="detail-top">
        <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
          <Icon name="arrowLeft" size={16} /> Back
        </button>
        <nav className="breadcrumbs detail-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to="/properties">Properties</Link> / <span>{property.title}</span>
        </nav>
      </div>

      <div className="gallery">
        <div className="gallery-main">
          {property.images.map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt={`${property.title} — photo ${i + 1}`}
              className={i === imageIndex ? "is-active" : ""}
            />
          ))}
          <button type="button" className="gallery-btn gallery-btn--prev" onClick={() => step(-1)} aria-label="Previous photo">
            <Icon name="chevronLeft" />
          </button>
          <button type="button" className="gallery-btn gallery-btn--next" onClick={() => step(1)} aria-label="Next photo">
            <Icon name="chevronRight" />
          </button>
          <span className="gallery-count">
            {imageIndex + 1} / {count}
          </span>
        </div>
        <div className="gallery-thumbs">
          {property.images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              className={`gallery-thumb ${i === imageIndex ? "is-active" : ""}`}
              onClick={() => setImageIndex(i)}
              aria-label={`Show photo ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <header className="detail-header">
            <div>
              <div className="detail-tags">
                <span className={`tag ${isRent ? "tag--rent" : "tag--sale"}`}>{property.status}</span>
                <span className="tag detail-type">{property.type}</span>
              </div>
              <h1>{property.title}</h1>
              <p className="detail-location">
                <Icon name="pin" size={16} /> {property.location}, {property.city}
              </p>
            </div>
            <div className="detail-price-box">
              <div className="detail-price">
                {formatPrice(property.price)}
                {isRent && <small> / year</small>}
              </div>
              <div className="detail-actions">
                <button
                  type="button"
                  className={`icon-btn detail-icon ${fav ? "is-fav" : ""}`}
                  onClick={() => toggleFavorite(property.id)}
                  aria-label={fav ? "Remove from favorites" : "Save to favorites"}
                  aria-pressed={fav}
                >
                  <Icon name="heart" filled={fav} />
                </button>
                <button type="button" className="icon-btn detail-icon" onClick={share} aria-label="Share">
                  <Icon name="share" />
                </button>
              </div>
            </div>
          </header>

          <ul className="detail-stats">
            {stats.map((s) => (
              <li key={s.label}>
                <Icon name={s.icon} size={22} />
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>

          <section className="detail-section">
            <h2>About this property</h2>
            <p>{property.description}</p>
          </section>

          <section className="detail-section">
            <h2>Features &amp; amenities</h2>
            <ul className="detail-features">
              {property.features.map((f) => (
                <li key={f}>
                  <span>
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="detail-section">
            <h2>Location</h2>
            <div className="detail-map">
              <iframe
                title={`Map of ${property.location}`}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.location}, ${property.city}`)}&z=13&output=embed`}
              />
            </div>
          </section>
        </div>

        <aside className="detail-side">
          <div className="agent card">
            <div className="agent-head">
              <img src={property.agent.image} alt={property.agent.name} />
              <div>
                <strong>{property.agent.name}</strong>
                <span>{property.agent.role}</span>
              </div>
            </div>
            <div className="agent-links">
              <a href={`tel:${property.agent.phone.replace(/\s/g, "")}`} className="btn btn-outline">
                <Icon name="phone" size={16} /> Call
              </a>
              <a href={`mailto:${property.agent.email}?subject=${encodeURIComponent(property.title)}`} className="btn btn-outline">
                <Icon name="mail" size={16} /> Email
              </a>
            </div>
            <AgentForm key={property.id} property={property} />
          </div>

          {!isRent && <MortgageCalculator key={property.id} price={property.price} />}
        </aside>
      </div>

      <section className="detail-similar">
        <div className="featured-head">
          <h2 className="section-title">Similar properties</h2>
          <Link to="/properties" className="btn btn-outline">
            View all <Icon name="arrowRight" size={16} />
          </Link>
        </div>
        <div className="similar-grid">
          {similar.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default PropertyDetail
