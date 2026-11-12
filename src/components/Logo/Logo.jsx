import { useId } from "react"
import { Link } from "react-router-dom"
import "./Logo.css"

const Logo = ({ light = false, tagline = true, onClick }) => {
  const gid = useId()
  return (
    <Link to="/" className={`logo ${light ? "logo--light" : ""}`} onClick={onClick} aria-label="Propify home">
      <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fbbf24" />
            <stop offset="1" stopColor="#f97316" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="22" r="20" fill={`url(#${gid})`} />
        <path d="M26 38h12v14l-6 6-6-6z" fill={`url(#${gid})`} />
        <path d="M32 11 21 21h3v10h16V21h3z" fill="#fff" />
        <rect x="29" y="22" width="6" height="6" fill={`url(#${gid})`} />
      </svg>
      <span className="logo-words">
        <span className="logo-name">Propify</span>
        {tagline && <span className="logo-tagline">Real Estate</span>}
      </span>
    </Link>
  )
}

export default Logo
