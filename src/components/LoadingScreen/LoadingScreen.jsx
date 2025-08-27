"use client"

import { useState, useEffect } from "react"
import "./LoadingScreen.css"

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 4
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading-screen">
      <div className="loading-background">
        <div className="floating-elements">
          <div className="floating-brick brick-1"></div>
          <div className="floating-brick brick-2"></div>
          <div className="floating-brick brick-3"></div>
          <div className="floating-brick brick-4"></div>
        </div>
      </div>

      <div className="loading-content">
        <div className="house-animation">
          <div className="house">
            <div className="house-roof"></div>
            <div className="house-body">
              <div className="window window-1"></div>
              <div className="window window-2"></div>
              <div className="door"></div>
            </div>
            <div className="chimney">
              <div className="smoke"></div>
            </div>
          </div>

          <div className="crane">
            <div className="crane-base"></div>
            <div className="crane-arm"></div>
            <div className="crane-hook"></div>
          </div>
        </div>

        <div className="loading-text">
          <h1 className="loading-title">DOMUS</h1>
          <p className="loading-subtitle">Building Your Dreams</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">{progress}%</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
