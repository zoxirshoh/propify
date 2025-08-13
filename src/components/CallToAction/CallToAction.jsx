import "./CallToAction.css"

const CallToAction = () => {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Find Your Dream Property?</h2>
          <p className="cta-subtitle">Join thousands of satisfied customers who found their perfect home with Domus</p>
          <div className="cta-buttons">
            <button className="cta-button primary">Get Started Today</button>
            <button className="cta-button secondary">Schedule Consultation</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
