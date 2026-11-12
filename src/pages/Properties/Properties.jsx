import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import PropertyCard from "../../components/PropertyCard/PropertyCard"
import Icon from "../../components/Icon/Icon"
import { properties, PROPERTY_TYPES } from "../../data/properties"
import { parseRange } from "../../utils/format"
import "./Properties.css"

const SORTS = {
  newest: { label: "Newest first", fn: (a, b) => b.yearBuilt - a.yearBuilt },
  "price-low": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  "price-high": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  "area-large": { label: "Area: largest first", fn: (a, b) => b.area - a.area },
}

const PRICE_OPTIONS = [
  { value: "", label: "Any price" },
  { value: "0-750000", label: "Under $750K" },
  { value: "750000-1500000", label: "$750K – $1.5M" },
  { value: "1500000-2000000", label: "$1.5M – $2M" },
  { value: "1500000+", label: "$1.5M+" },
  { value: "2000000+", label: "$2M+" },
]

const FILTER_KEYS = ["q", "type", "price", "status", "beds"]

const Properties = () => {
  const [params, setParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const filters = {
    q: params.get("q") ?? "",
    type: params.get("type") ?? "",
    price: params.get("price") ?? "",
    status: params.get("status") ?? "",
    beds: params.get("beds") ?? "",
    sort: SORTS[params.get("sort")] ? params.get("sort") : "newest",
    view: params.get("view") === "list" ? "list" : "grid",
  }

  const setFilter = (key, value) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true },
    )
  }

  const resetFilters = () =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        FILTER_KEYS.forEach((k) => next.delete(k))
        return next
      },
      { replace: true },
    )

  const activeCount = FILTER_KEYS.filter((k) => filters[k]).length

  const results = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    const range = parseRange(filters.price)
    const minBeds = Number(filters.beds) || 0
    return properties
      .filter((p) => !q || `${p.title} ${p.location} ${p.city}`.toLowerCase().includes(q))
      .filter((p) => !filters.type || p.type === filters.type)
      .filter((p) => !filters.status || p.status === filters.status)
      .filter((p) => !range || (p.price >= range.min && p.price <= range.max))
      .filter((p) => p.bedrooms >= minBeds)
      .sort(SORTS[filters.sort].fn)
  }, [filters.q, filters.type, filters.status, filters.price, filters.beds, filters.sort])

  return (
    <div className="properties-page">
      <section className="page-banner">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <span>Properties</span>
          </nav>
          <h1>Find your next home</h1>
          <p>Discover {properties.length} premium properties for sale and rent from our exclusive collection.</p>
        </div>
      </section>

      <div className="container properties-layout">
        <aside className={`filters ${showFilters ? "is-open" : ""}`} aria-label="Filters">
          <div className="filters-head">
            <h2>
              <Icon name="filter" size={18} /> Filters
            </h2>
            {activeCount > 0 && (
              <button type="button" className="filters-reset" onClick={resetFilters}>
                Reset ({activeCount})
              </button>
            )}
          </div>

          <div className="field">
            <label htmlFor="f-q">Search</label>
            <div className="input-icon">
              <Icon name="search" size={18} />
              <input
                id="f-q"
                className="input"
                placeholder="Title or location…"
                value={filters.q}
                onChange={(e) => setFilter("q", e.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <span className="field-label">Listing</span>
            <div className="segmented">
              {[
                ["", "All"],
                ["For Sale", "Buy"],
                ["For Rent", "Rent"],
              ].map(([value, label]) => (
                <button
                  key={label}
                  type="button"
                  className={filters.status === value ? "is-active" : ""}
                  onClick={() => setFilter("status", value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="f-type">Property type</label>
            <select
              id="f-type"
              className="input"
              value={filters.type}
              onChange={(e) => setFilter("type", e.target.value)}
            >
              <option value="">All types</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="f-price">Price range</label>
            <select
              id="f-price"
              className="input"
              value={filters.price}
              onChange={(e) => setFilter("price", e.target.value)}
            >
              {PRICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <span className="field-label">Bedrooms</span>
            <div className="segmented">
              {["", "1", "2", "3", "4"].map((b) => (
                <button
                  key={b || "any"}
                  type="button"
                  className={filters.beds === b ? "is-active" : ""}
                  onClick={() => setFilter("beds", b)}
                >
                  {b ? `${b}+` : "Any"}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="btn btn-primary btn-block filters-apply" onClick={() => setShowFilters(false)}>
            Show {results.length} results
          </button>
        </aside>

        <section className="results">
          <div className="results-bar">
            <p className="results-count">
              <strong>{results.length}</strong> {results.length === 1 ? "property" : "properties"} found
            </p>
            <div className="results-tools">
              <button type="button" className="btn btn-outline filters-toggle" onClick={() => setShowFilters(true)}>
                <Icon name="filter" size={16} /> Filters {activeCount > 0 && `(${activeCount})`}
              </button>
              <label className="sr-only" htmlFor="f-sort">
                Sort by
              </label>
              <select
                id="f-sort"
                className="input sort-select"
                value={filters.sort}
                onChange={(e) => setFilter("sort", e.target.value === "newest" ? "" : e.target.value)}
              >
                {Object.entries(SORTS).map(([key, s]) => (
                  <option key={key} value={key}>
                    {s.label}
                  </option>
                ))}
              </select>
              <div className="view-toggle" role="group" aria-label="Layout">
                <button
                  type="button"
                  className={filters.view === "grid" ? "is-active" : ""}
                  onClick={() => setFilter("view", "")}
                  aria-label="Grid view"
                  aria-pressed={filters.view === "grid"}
                >
                  <Icon name="grid" size={18} />
                </button>
                <button
                  type="button"
                  className={filters.view === "list" ? "is-active" : ""}
                  onClick={() => setFilter("view", "list")}
                  aria-label="List view"
                  aria-pressed={filters.view === "list"}
                >
                  <Icon name="list" size={18} />
                </button>
              </div>
            </div>
          </div>

          {results.length > 0 ? (
            <div className={`results-grid results-grid--${filters.view}`}>
              {results.map((p, i) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  layout={filters.view}
                  style={{ animationDelay: `${Math.min(i, 6) * 0.06}s` }}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🏚️</div>
              <h3>No properties match your filters</h3>
              <p>Try widening the price range or removing a filter.</p>
              <button type="button" className="btn btn-primary" onClick={resetFilters}>
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </div>
      {showFilters && <div className="filters-backdrop" onClick={() => setShowFilters(false)} />}
    </div>
  )
}

export default Properties
