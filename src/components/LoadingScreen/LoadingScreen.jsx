import { useEffect, useRef, useState } from "react"
import "./LoadingScreen.css"

const DURATION = 1400 // ms

/**
 * Splash screen shown once per session. Progress follows the real page
 * load: it never reaches 100% before `window.load` fires, then finishes.
 */
const LoadingScreen = ({ onDone }) => {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    let raf
    let loaded = document.readyState === "complete"
    const start = performance.now()
    const onLoad = () => {
      loaded = true
    }
    window.addEventListener("load", onLoad)

    let finishTimer
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const value = Math.round(eased * (loaded ? 100 : 90))
      setProgress(value)
      if (t >= 1 && loaded) {
        setLeaving(true)
        finishTimer = setTimeout(() => onDoneRef.current?.(), 450)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(finishTimer)
      window.removeEventListener("load", onLoad)
    }
  }, [])

  return (
    <div className={`splash ${leaving ? "is-leaving" : ""}`} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Loading Propify">
      <div className="splash-glow" />
      <div className="splash-content">
        <svg className="splash-mark" viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="splash-g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fbbf24" />
              <stop offset="1" stopColor="#f97316" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="22" r="20" fill="url(#splash-g)" />
          <path d="M26 38h12v14l-6 6-6-6z" fill="url(#splash-g)" />
          <path className="splash-house" d="M32 11 21 21h3v10h16V21h3z" fill="#fff" />
          <rect x="29" y="22" width="6" height="6" fill="url(#splash-g)" />
        </svg>
        <h1 className="splash-title">Propify</h1>
        <p className="splash-subtitle">Simplifying Property, Amplifying Value</p>
        <div className="splash-bar">
          <div className="splash-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="splash-percent">{progress}%</span>
      </div>
    </div>
  )
}

export default LoadingScreen
