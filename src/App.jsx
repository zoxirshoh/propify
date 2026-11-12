import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import LoadingScreen from "./components/LoadingScreen/LoadingScreen"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"
import Toast from "./components/Toast/Toast"
import Home from "./pages/Home/Home"
import Properties from "./pages/Properties/Properties"
import PropertyDetail from "./pages/PropertyDetail/PropertyDetail"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Login from "./pages/Login/Login"
import Favorites from "./pages/Favorites/Favorites"
import NotFound from "./pages/NotFound/NotFound"

const SPLASH_KEY = "propify:splash-shown"

const shouldShowSplash = () => {
  try {
    return !sessionStorage.getItem(SPLASH_KEY)
  } catch {
    return false
  }
}

const App = () => {
  // Splash screen only once per browser session, not on every reload/navigation.
  const [showSplash, setShowSplash] = useState(shouldShowSplash)

  useEffect(() => {
    if (!showSplash) return
    try {
      sessionStorage.setItem(SPLASH_KEY, "1")
    } catch {
      /* ignore */
    }
  }, [showSplash])

  if (showSplash) {
    return <LoadingScreen onDone={() => setShowSplash(false)} />
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </>
  )
}

export default App
