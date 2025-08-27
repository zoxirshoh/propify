"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import "./Header.css"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <span className="logo-text">DOMUS</span>
          <span className="logo-tagline">Premium Real Estate</span>
        </div>

        <nav className={`header-nav ${isMenuOpen ? "mobile-open" : ""}`}>
          <ul className="nav-list">
            <li>
              <Link to="/" className={`nav-link ${isActive("/")}`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/properties"
                className={`nav-link ${isActive("/properties")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${isActive("/about")}`} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`nav-link ${isActive("/contact")}`} onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="contact-info1">
            <span className="phone">📞 +998 (77) 355 2105</span>
          </div>

        <div className="header-actions">
          
          <Link to="/login">
          <button className="cta-button">
            Get Started
            <span className="arrow">→</span>
          </button>
          </Link>
        </div>

        <button className={`mobile-menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </header>
  )
}

export default Header
