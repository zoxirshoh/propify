import { Link } from "react-router-dom"
import PropertyCard from "../PropertyCard/PropertyCard"
import Icon from "../Icon/Icon"
import { properties } from "../../data/properties"
import "./FeaturedProperties.css"

const featured = properties.filter((p) => p.featured)

const FeaturedProperties = () => (
  <section className="section featured">
    <div className="container">
      <div className="featured-head">
        <div>
          <span className="eyebrow">Featured</span>
          <h2 className="section-title">Handpicked premium homes</h2>
          <p className="section-subtitle">Discover our selection of the most-loved properties this month.</p>
        </div>
        <Link to="/properties" className="btn btn-outline">
          View all properties <Icon name="arrowRight" size={16} />
        </Link>
      </div>

      <div className="featured-grid">
        {featured.map((p, i) => (
          <PropertyCard key={p.id} property={p} style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  </section>
)

export default FeaturedProperties
