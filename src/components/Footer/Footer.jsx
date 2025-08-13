import "../Footer/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-background">
        <div className="floating-pattern pattern-1"></div>
        <div className="floating-pattern pattern-2"></div>
        <div className="floating-pattern pattern-3"></div>
      </div>

      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h3 className="logo-text">DOMUS</h3>
              <p className="logo-tagline">Premium Real Estate</p>
            </div>
            <p className="footer-description">
              Your trusted partner in finding the perfect property. We combine expertise with personalized service to
              make your real estate dreams come true.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#properties">Properties</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li>
                <a href="#buy">Buy Property</a>
              </li>
              <li>
                <a href="#sell">Sell Property</a>
              </li>
              <li>
                <a href="#rent">Rent Property</a>
              </li>
              <li>
                <a href="#invest">Investment</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>info@domus.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>123 Real Estate Ave, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Domus. All rights reserved.</p>
          <div className="footer-social">
            <a href="#" className="social-link">
              Facebook
            </a>
            <a href="#" className="social-link">
              Twitter
            </a>
            <a href="#" className="social-link">
              LinkedIn
            </a>
            <a href="#" className="social-link">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
