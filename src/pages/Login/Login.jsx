import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "../../components/Logo/Logo"
import Icon from "../../components/Icon/Icon"
import { useApp } from "../../context/app-context"
import loginImage from "../../assets/images/modern-penthouse-city-view.png"
import "./Login.css"

const emptyForm = { fullName: "", email: "", password: "", confirmPassword: "", agreeToTerms: false }

const passwordStrength = (pw) => {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"]

const Login = () => {
  const { user, login, notify } = useApp()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const switchMode = (loginMode) => {
    setIsLogin(loginMode)
    setErrors({})
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const next = {}
    if (!isLogin && !form.fullName.trim()) next.fullName = "Please enter your full name"
    if (!form.email.trim()) next.email = "Please enter your email"
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Email format is invalid"
    if (!form.password) next.password = "Please enter your password"
    else if (form.password.length < 8) next.password = "Password must be at least 8 characters"
    if (!isLogin && form.password !== form.confirmPassword) next.confirmPassword = "Passwords do not match"
    if (!isLogin && !form.agreeToTerms) next.agreeToTerms = "You must accept the terms"
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length) return setErrors(next)

    setLoading(true)
    // Demo auth: no backend yet, so we only keep the profile (never the password) locally.
    setTimeout(() => {
      const fullName = isLogin ? form.email.split("@")[0] : form.fullName.trim()
      login({ email: form.email.trim(), fullName })
      notify(isLogin ? `Welcome back, ${fullName}!` : `Account created. Welcome, ${fullName}!`)
      setLoading(false)
      navigate("/properties")
    }, 900)
  }

  const strength = passwordStrength(form.password)

  return (
    <div className="auth">
      <div className="auth-visual">
        <img src={loginImage} alt="" />
        <div className="auth-visual-overlay">
          <Logo light />
          <div>
            <h2>Your dream home is a few clicks away.</h2>
            <p>Save favorites, contact agents and get personalised recommendations.</p>
          </div>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card fade-up">
          {user ? (
            <div className="auth-signed">
              <span className="auth-signed-avatar">{user.fullName?.[0]?.toUpperCase()}</span>
              <h1>You're signed in</h1>
              <p>
                Signed in as <strong>{user.email}</strong>
              </p>
              <Link to="/properties" className="btn btn-primary btn-block">
                Browse properties
              </Link>
            </div>
          ) : (
            <>
              <h1 className="auth-title">{isLogin ? "Welcome back" : "Create your account"}</h1>
              <p className="auth-subtitle">
                {isLogin ? "Sign in to access your saved homes." : "Join Propify — it's free and takes a minute."}
              </p>

              <div className="segmented auth-tabs">
                <button type="button" className={isLogin ? "is-active" : ""} onClick={() => switchMode(true)}>
                  Sign in
                </button>
                <button type="button" className={!isLogin ? "is-active" : ""} onClick={() => switchMode(false)}>
                  Sign up
                </button>
              </div>

              <form onSubmit={handleSubmit} className="auth-form" noValidate>
                {!isLogin && (
                  <div className="field">
                    <label htmlFor="l-name">Full name</label>
                    <input
                      id="l-name"
                      name="fullName"
                      autoComplete="name"
                      className={`input ${errors.fullName ? "has-error" : ""}`}
                      value={form.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                  </div>
                )}

                <div className="field">
                  <label htmlFor="l-email">Email</label>
                  <input
                    id="l-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`input ${errors.email ? "has-error" : ""}`}
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="field">
                  <label htmlFor="l-password">Password</label>
                  <div className="password-wrap">
                    <input
                      id="l-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      className={`input ${errors.password ? "has-error" : ""}`}
                      value={form.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {!isLogin && form.password && (
                    <div className={`strength strength--${strength}`}>
                      <div className="strength-bars">
                        {[1, 2, 3, 4].map((n) => (
                          <span key={n} className={n <= strength ? "on" : ""} />
                        ))}
                      </div>
                      <small>{strengthLabels[strength]}</small>
                    </div>
                  )}
                  {errors.password && <span className="field-error">{errors.password}</span>}
                </div>

                {!isLogin && (
                  <div className="field">
                    <label htmlFor="l-confirm">Confirm password</label>
                    <input
                      id="l-confirm"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      className={`input ${errors.confirmPassword ? "has-error" : ""}`}
                      value={form.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
                  </div>
                )}

                {!isLogin && (
                  <div className="field">
                    <label className="checkbox">
                      <input type="checkbox" name="agreeToTerms" checked={form.agreeToTerms} onChange={handleChange} />
                      <span>I agree to the Terms of Service and Privacy Policy</span>
                    </label>
                    {errors.agreeToTerms && <span className="field-error">{errors.agreeToTerms}</span>}
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={loading}>
                  {loading ? <span className="spinner" /> : isLogin ? "Sign in" : "Create account"}
                </button>
              </form>

              <p className="auth-switch">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={() => switchMode(!isLogin)}>
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
