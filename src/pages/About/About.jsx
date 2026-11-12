import { Link } from "react-router-dom"
import AboutUs from "../../components/AboutUs/AboutUs"
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs"
import CallToAction from "../../components/CallToAction/CallToAction"

const About = () => (
  <>
    <section className="page-banner">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <span>About</span>
        </nav>
        <h1>About Propify</h1>
        <p>Fifteen years of helping people buy, sell and rent property with confidence.</p>
      </div>
    </section>
    <AboutUs />
    <WhyChooseUs />
    <CallToAction />
  </>
)

export default About
