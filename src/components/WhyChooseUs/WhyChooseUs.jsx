import Icon from "../Icon/Icon"
import "./WhyChooseUs.css"

const features = [
  {
    icon: "home",
    title: "Premium Properties",
    description: "Curated selection of high-quality homes and commercial spaces in prime locations.",
  },
  {
    icon: "dollar",
    title: "Transparent Prices",
    description: "Competitive pricing with clear fees and no hidden costs on any transaction.",
  },
  {
    icon: "users",
    title: "Expert Support",
    description: "Experienced agents guide you through viewing, negotiation and paperwork.",
  },
  {
    icon: "zap",
    title: "Fast Process",
    description: "Digital tools and a streamlined workflow help you close deals faster.",
  },
]

const WhyChooseUs = () => (
  <section className="section why">
    <div className="container">
      <div className="section-head">
        <span className="eyebrow">Why Propify</span>
        <h2 className="section-title">Everything you need to move with confidence</h2>
        <p className="section-subtitle">We provide exceptional real estate services with a commitment to excellence.</p>
      </div>

      <div className="why-grid">
        {features.map((f, i) => (
          <div key={f.title} className="why-card" style={{ animationDelay: `${i * 0.08}s` }}>
            <span className="why-icon">
              <Icon name={f.icon} size={24} />
            </span>
            <h3>{f.title}</h3>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default WhyChooseUs
