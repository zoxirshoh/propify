import { Link } from "react-router-dom"
import PropertyCard from "../../components/PropertyCard/PropertyCard"
import Icon from "../../components/Icon/Icon"
import { properties } from "../../data/properties"
import { useApp } from "../../context/app-context"
import { formatPrice } from "../../utils/format"

const Favorites = () => {
  const { favorites } = useApp()
  const saved = properties.filter((p) => favorites.includes(p.id))
  const total = saved.reduce((sum, p) => sum + p.price, 0)

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <span>Favorites</span>
          </nav>
          <h1>Your saved homes</h1>
          <p>
            {saved.length > 0
              ? `${saved.length} saved ${saved.length === 1 ? "property" : "properties"} · total value ${formatPrice(total)}`
              : "Tap the heart on any property to save it here."}
          </p>
        </div>
      </section>

      <div className="container section" style={{ paddingTop: 48 }}>
        {saved.length > 0 ? (
          <div className="results-grid results-grid--grid">
            {saved.map((p, i) => (
              <PropertyCard key={p.id} property={p} style={{ animationDelay: `${i * 0.06}s` }} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">💛</div>
            <h3>No favorites yet</h3>
            <p>Save properties you like and compare them later.</p>
            <Link to="/properties" className="btn btn-primary">
              Browse properties <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Favorites
