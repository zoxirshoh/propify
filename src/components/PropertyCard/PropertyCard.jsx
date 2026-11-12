import { Link } from "react-router-dom"
import Icon from "../Icon/Icon"
import { useApp } from "../../context/app-context"
import { formatNumber, formatPrice } from "../../utils/format"
import "./PropertyCard.css"

const PropertyCard = ({ property, layout = "grid", style }) => {
  const { isFavorite, toggleFavorite } = useApp()
  const fav = isFavorite(property.id)
  const isRent = property.status === "For Rent"

  return (
    <article className={`pcard pcard--${layout}`} style={style}>
      <div className="pcard-media">
        <Link to={`/property/${property.id}`} aria-label={property.title}>
          <img src={property.images[0]} alt={property.title} loading="lazy" />
        </Link>
        <div className="pcard-tags">
          <span className={`tag ${isRent ? "tag--rent" : "tag--sale"}`}>{property.status}</span>
          <span className="tag tag--glass">{property.type}</span>
        </div>
        <button
          type="button"
          className={`pcard-fav ${fav ? "is-active" : ""}`}
          onClick={() => toggleFavorite(property.id)}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={fav}
        >
          <Icon name="heart" size={18} filled={fav} />
        </button>
      </div>

      <div className="pcard-body">
        <div className="pcard-price">
          {formatPrice(property.price)}
          {isRent && <small> / year</small>}
        </div>
        <h3 className="pcard-title">
          <Link to={`/property/${property.id}`}>{property.title}</Link>
        </h3>
        <p className="pcard-location">
          <Icon name="pin" size={15} /> {property.location}, {property.city}
        </p>
        <ul className="pcard-meta">
          <li>
            <Icon name="bed" size={16} /> {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
          </li>
          <li>
            <Icon name="bath" size={16} /> {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
          </li>
          <li>
            <Icon name="area" size={16} /> {formatNumber(property.area)} ft²
          </li>
        </ul>
        {layout === "list" && <p className="pcard-desc">{property.description}</p>}
        <Link to={`/property/${property.id}`} className="pcard-link">
          View details <Icon name="arrowRight" size={16} />
        </Link>
      </div>
    </article>
  )
}

export const PropertyCardSkeleton = () => (
  <div className="pcard pcard--skeleton" aria-hidden="true">
    <div className="pcard-media sk" />
    <div className="pcard-body">
      <div className="sk sk-line" style={{ width: "40%", height: 22 }} />
      <div className="sk sk-line" style={{ width: "80%" }} />
      <div className="sk sk-line" style={{ width: "60%" }} />
      <div className="sk sk-line" style={{ width: "100%", height: 34, marginTop: 8 }} />
    </div>
  </div>
)

export default PropertyCard
