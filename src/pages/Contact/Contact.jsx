const Contact = () => {
  return (
    <div style={{ paddingTop: "100px", padding: "100px 20px 50px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ color: "#0C1B33", fontSize: "2.5rem", marginBottom: "20px" }}>Contact Us</h1>
        <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: "40px" }}>
          Get in touch with our real estate experts
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            marginBottom: "40px",
          }}
        >
          <div style={{ padding: "30px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
            <h3 style={{ color: "#0C1B33", marginBottom: "15px" }}>Phone</h3>
            <p style={{ color: "#EAB308", fontSize: "1.2rem", fontWeight: "bold" }}>+1 (555) 123-4567</p>
          </div>

          <div style={{ padding: "30px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
            <h3 style={{ color: "#0C1B33", marginBottom: "15px" }}>Email</h3>
            <p style={{ color: "#EAB308", fontSize: "1.2rem", fontWeight: "bold" }}>info@domus.com</p>
          </div>

          <div style={{ padding: "30px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
            <h3 style={{ color: "#0C1B33", marginBottom: "15px" }}>Address</h3>
            <p style={{ color: "#666" }}>
              123 Real Estate Ave
              <br />
              New York, NY 10001
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
