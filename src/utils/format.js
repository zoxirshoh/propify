const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export const formatPrice = (price) => priceFormatter.format(price)

export const formatNumber = (n) => new Intl.NumberFormat("en-US").format(n)

/** Parses "min-max" or "min+" into numbers. Returns null for empty input. */
export const parseRange = (value) => {
  if (!value) return null
  if (value.endsWith("+")) return { min: Number(value.slice(0, -1)), max: Infinity }
  const [min, max] = value.split("-").map(Number)
  return { min: min || 0, max: max || Infinity }
}

export const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      if (value === null || value === undefined) localStorage.removeItem(key)
      else localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable */
    }
  },
}
