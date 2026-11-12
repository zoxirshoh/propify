import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../Logo/Logo"
import Icon from "../Icon/Icon"
import { useApp } from "../../context/app-context"
import "./Footer.css"

const Footer = () => {
  const { notify } = useApp()
  const [email, setEmail] = useState("")

  const subscribe = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      notify("Please enter a valid email address", "error")
      return
    }
    setEmail("")
    notify("Thanks! You're subscribed to new listings.")
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo light />
            <p>
              Your trusted partner in finding the perfect property. We combine expertise with personal service to make
              your real estate dreams come true.
            </p>
            <form className="footer-news" onSubmit={subscribe}>
              <label htmlFor="newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                placeholder="Get new listings by email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" aria-label="Subscribe">
                <Icon name="send" size={16} />
              </button>
            </form>
          </div>

          <div>
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/properties">Properties</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li>
                <Link to="/properties?status=For+Sale">Buy property</Link>
              </li>
              <li>
                <Link to="/properties?status=For+Rent">Rent property</Link>
              </li>
              <li>
                <Link to="/contact">Sell property</Link>
              </li>
              <li>
                <Link to="/contact">Investment advice</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-contact">
              <li>
                <Icon name="phone" size={16} />
                <a href="tel:+998773552105">+998 77 355 21 05</a>
              </li>
              <li>
                <Icon name="mail" size={16} />
                <a href="mailto:info@propify.uz">info@propify.uz</a>
              </li>
              <li>
                <Icon name="pin" size={16} />
                <span>Amir Temur Ave 108, Tashkent</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Propify. All rights reserved.</p>
          <div className="footer-social">
            {["Facebook", "Instagram", "Telegram", "LinkedIn"].map((s) => (
              <a key={s} href="#" onClick={(e) => e.preventDefault()}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
