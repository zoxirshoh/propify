import teamImage from "../../assets/images/real-estate-team.png"
import "./AboutUs.css"

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About Domus</h2>
            <p className="about-description">
              With over 15 years of experience in the real estate industry, Domus has established itself as a trusted
              partner for property buyers, sellers, and investors. Our commitment to excellence and personalized service
              has helped thousands of clients find their perfect home.
            </p>
            <p className="about-description">
              We combine cutting-edge technology with deep market knowledge to provide unparalleled service in the real
              estate market. Our team of experienced professionals is dedicated to making your property journey smooth
              and successful.
            </p>
            <div className="stats">
              <div className="stat">
                <h3>1,500+</h3>
                <p>Properties Sold</p>
              </div>
              <div className="stat">
                <h3>98%</h3>
                <p>Client Satisfaction</p>
              </div>
              <div className="stat">
                <h3>15+</h3>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src={teamImage || "/placeholder.svg"} alt="Real Estate Team" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
