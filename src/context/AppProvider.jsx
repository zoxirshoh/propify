import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AppContext } from "./app-context"
import { storage } from "../utils/format"

const getInitialTheme = () => {
  const saved = storage.get("theme", null)
  if (saved === "light" || saved === "dark") return saved
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => storage.get("favorites", []))
  const [user, setUser] = useState(() => storage.get("user", null))
  const [theme, setTheme] = useState(getInitialTheme)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  useEffect(() => storage.set("favorites", favorites), [favorites])
  useEffect(() => storage.set("user", user), [user])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    storage.set("theme", theme)
  }, [theme])

  const notify = useCallback((message, type = "success") => {
    const id = ++toastId.current
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200)
  }, [])

  const dismissToast = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  const toggleFavorite = useCallback(
    (id) => {
      const exists = favorites.includes(id)
      setFavorites((prev) => (exists ? prev.filter((f) => f !== id) : [...prev, id]))
      notify(exists ? "Removed from favorites" : "Added to favorites", exists ? "info" : "success")
    },
    [favorites, notify],
  )

  const login = useCallback((data) => setUser({ ...data, loginTime: new Date().toISOString() }), [])
  const logout = useCallback(() => {
    setUser(null)
    notify("You have been signed out", "info")
  }, [notify])

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), [])

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      user,
      login,
      logout,
      theme,
      toggleTheme,
      toasts,
      notify,
      dismissToast,
    }),
    [favorites, isFavorite, toggleFavorite, user, login, logout, theme, toggleTheme, toasts, notify, dismissToast],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
