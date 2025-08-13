import Hero from "../../components/Hero/Hero"
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs"
import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties"
import AboutUs from "../../components/AboutUs/AboutUs"
import Testimonials from "../../components/Testimonials/Testimonials"
import CallToAction from "../../components/CallToAction/CallToAction"

const Home = () => {
  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <FeaturedProperties />
      <AboutUs />
      <Testimonials />
      <CallToAction />
    </main>
  )
}

export default Home
