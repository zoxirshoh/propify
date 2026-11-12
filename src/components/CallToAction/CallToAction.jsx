import { Link } from "react-router-dom"
import Icon from "../Icon/Icon"
import "./CallToAction.css"

const CallToAction = () => (
  <section className="section cta-section">
    <div className="container">
      <div className="cta-box">
        <div className="cta-copy">
          <h2>Ready to find your dream property?</h2>
          <p>Join thousands of happy customers who found their perfect home with Propify.</p>
        </div>
        <div className="cta-actions">
          <Link to="/properties" className="btn btn-primary btn-lg">
            Browse properties <Icon name="arrowRight" size={18} />
          </Link>
          <Link to="/contact" className="btn btn-ghost-light btn-lg">
            <Icon name="calendar" size={18} /> Book a consultation
          </Link>
        </div>
      </div>
    </div>
  </section>
)

export default CallToAction
