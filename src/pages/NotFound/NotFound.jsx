import { Link } from "react-router-dom"
import Icon from "../../components/Icon/Icon"

const NotFound = () => (
  <div className="container" style={{ padding: "120px 16px", textAlign: "center" }}>
    <p className="text-gradient" style={{ fontSize: "clamp(5rem, 18vw, 9rem)", fontWeight: 800, lineHeight: 1 }}>
      404
    </p>
    <h1 style={{ fontSize: "1.8rem", margin: "12px 0 8px" }}>This page moved out</h1>
    <p style={{ color: "var(--text-muted)", marginBottom: 28 }}>
      The page you're looking for doesn't exist. Let's get you back home.
    </p>
    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      <Link to="/" className="btn btn-primary">
        <Icon name="home" size={16} /> Go home
      </Link>
      <Link to="/properties" className="btn btn-outline">
        Browse properties
      </Link>
    </div>
  </div>
)

export default NotFound
