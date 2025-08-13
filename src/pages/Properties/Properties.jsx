import FeaturedProperties from "../../components/FeaturedProperties/FeaturedProperties"

const Properties = () => {
  return (
    <div style={{ paddingTop: "100px" }}>
      <div style={{ textAlign: "center", padding: "50px 20px" }}>
        <h1 style={{ color: "#0C1B33", fontSize: "2.5rem", marginBottom: "20px" }}>All Properties</h1>
        <p style={{ color: "#666", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
          Discover our complete collection of premium properties
        </p>
      </div>
      <FeaturedProperties />
    </div>
  )
}

export default Properties
