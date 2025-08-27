"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState("")
  const [isFormVisible, setIsFormVisible] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => setIsFormVisible(true), 300)
  }, [])

  const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = { email, fullName: "Foydalanuvchi", loginTime: new Date().toISOString() }
          localStorage.setItem("user", JSON.stringify(userData))
          localStorage.setItem("isLoggedIn", "true")
          resolve(userData)
        } else {
          reject(new Error("Email va parol to'ldirilishi shart"))
        }
      }, 1000)
    })
  }

  const registerUser = (fullName, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (fullName && email && password) {
          const userData = { email, fullName, loginTime: new Date().toISOString() }
          localStorage.setItem("user", JSON.stringify(userData))
          localStorage.setItem("isLoggedIn", "true")
          resolve(userData)
        } else {
          reject(new Error("Barcha maydonlarni to'ldiring"))
        }
      }, 1000)
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleInputFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleInputBlur = () => {
    setFocusedField("")
  }

  const validateForm = () => {
    const newErrors = {}

    if (!isLogin && !formData.fullName.trim()) {
      newErrors.fullName = "To'liq ismingizni kiriting"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email manzilni kiriting"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email noto'g'ri formatda"
    }

    if (!formData.password) {
      newErrors.password = "Parolni kiriting"
    } else if (formData.password.length < 8) {
      newErrors.password = "Parol kamida 8 ta belgidan iborat bo'lishi kerak"
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parollar mos kelmaydi"
    }

    if (!isLogin && !formData.agreeToTerms) {
      newErrors.agreeToTerms = "Shartlarga roziman deb belgilang"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      if (isLogin) {
        await loginUser(formData.email, formData.password)
      } else {
        await registerUser(formData.fullName, formData.email, formData.password)
      }
      navigate("/properties")
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
          <div className="shape shape-6"></div>
        </div>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
      </div>

      <div className={`login-card ${isFormVisible ? "visible" : ""}`}>
        <div className="login-header">
          <h1 className="brand-name">
            {"DOMUS".split("").map((letter, index) => (
              <span key={index} className="brand-letter" style={{ animationDelay: `${index * 0.1}s` }}>
                {letter}
              </span>
            ))}
          </h1>
          <h2 className="login-title">{isLogin ? "Hisobga kirish" : "Ro'yxatdan o'tish"}</h2>
          <p className="login-subtitle">
            {isLogin ? "Premium mulk portalida yangi hisob yarating." : "Premium mulk portalida yangi hisob yarating."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className={`form-group ${focusedField === "fullName" ? "focused" : ""}`}>
              <input
                type="text"
                name="fullName"
                placeholder="To'liq ismingiz"
                value={formData.fullName}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus("fullName")}
                onBlur={handleInputBlur}
                className={`form-input ${errors.fullName ? "error" : ""}`}
              />
              <span className="input-highlight"></span>
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>
          )}

          <div className={`form-group ${focusedField === "email" ? "focused" : ""}`}>
            <input
              type="email"
              name="email"
              placeholder="Email manzlingiz"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus("email")}
              onBlur={handleInputBlur}
              className={`form-input ${errors.email ? "error" : ""}`}
            />
            <span className="input-highlight"></span>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className={`form-group ${focusedField === "password" ? "focused" : ""}`}>
            <input
              type="password"
              name="password"
              placeholder="Parolingiz"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => handleInputFocus("password")}
              onBlur={handleInputBlur}
              className={`form-input ${errors.password ? "error" : ""}`}
            />
            <span className="input-highlight"></span>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className={`form-group ${focusedField === "confirmPassword" ? "focused" : ""}`}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Parolni tasdiqlang"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={() => handleInputFocus("confirmPassword")}
                onBlur={handleInputBlur}
                className={`form-input ${errors.confirmPassword ? "error" : ""}`}
              />
              <span className="input-highlight"></span>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          )}

          {!isLogin && (
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="checkbox-input"
                />
                <span className="checkbox-custom">
                  <span className="checkmark"></span>
                </span>
                Shartlarga roziman
              </label>
              {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
            </div>
          )}

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

          <button type="submit" className={`submit-button ${loading ? "loading" : ""}`} disabled={loading}>
            <span className="button-ripple"></span>
            <span className="button-text">
              {loading ? <div className="loading-spinner"></div> : isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
            </span>
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Hisobingiz yo'qmi? " : "Hisobingiz bormi? "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="toggle-button">
              {isLogin ? "Ro'yxatdan o'tish" : "Kirish"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
