import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Icon from "../Icon/Icon"
import "./ScrollToTop.css"

/** Resets scroll on route change and renders a floating "back to top" button. */
const ScrollToTop = () => {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top ${visible ? "is-visible" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <Icon name="arrowUp" />
    </button>
  )
}

export default ScrollToTop
