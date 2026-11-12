import { useEffect, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import Logo from "../Logo/Logo"
import Icon from "../Icon/Icon"
import { useApp } from "../../context/app-context"
import "./Header.css"

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { favorites, theme, toggleTheme, user, logout } = useApp()
  const location = useLocation()
  const navigate = useNavigate()

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const firstName = user?.fullName?.split(" ")[0]

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Logo />

        <nav className={`header-nav ${isMenuOpen ? "is-open" : ""}`} aria-label="Main">
          <ul className="nav-list">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className="nav-link">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a href="tel:+998773552105" className="nav-phone">
            <Icon name="phone" size={16} /> +998 77 355 21 05
          </a>
          {!user && (
            <Link to="/login" className="btn btn-primary btn-block nav-mobile-cta">
              Sign in
            </Link>
          )}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn header-icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} />
          </button>

          <Link to="/favorites" className="icon-btn header-icon" aria-label={`Favorites (${favorites.length})`}>
            <Icon name="heart" />
            {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </Link>

          {user ? (
            <div className="user-chip">
              <span className="user-avatar">{firstName?.[0]?.toUpperCase() || "U"}</span>
              <span className="user-name">{firstName}</span>
              <button type="button" className="icon-btn user-logout" onClick={handleLogout} aria-label="Sign out">
                <Icon name="logout" size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary header-cta">
              Get Started <Icon name="arrowRight" size={16} />
            </Link>
          )}

          <button
            type="button"
            className={`icon-btn header-icon menu-toggle ${isMenuOpen ? "is-active" : ""}`}
            onClick={() => setIsMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Icon name={isMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
