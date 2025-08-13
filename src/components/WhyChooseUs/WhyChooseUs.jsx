import "./WhyChooseUs.css"

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🏠",
      title: "Premium Properties",
      description: "Curated selection of high-quality homes and commercial spaces in prime locations.",
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Competitive pricing with transparent fees and no hidden costs for all transactions.",
    },
    {
      icon: "🤝",
      title: "Expert Support",
      description: "Professional real estate agents with years of experience to guide you through every step.",
    },
    {
      icon: "⚡",
      title: "Quick Process",
      description: "Streamlined buying and selling process with digital tools for faster transactions.",
    },
  ]

  return (
    <section className="why-choose-us">
      <div className="container">
        <h2 className="section-title">Why Choose Domus</h2>
        <p className="section-subtitle">We provide exceptional real estate services with a commitment to excellence</p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
