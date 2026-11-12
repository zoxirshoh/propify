import { useState } from "react"
import Icon from "../Icon/Icon"
import { formatPrice } from "../../utils/format"
import "./MortgageCalculator.css"

const MortgageCalculator = ({ price }) => {
  const [downPct, setDownPct] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)

  const principal = price * (1 - downPct / 100)
  const n = years * 12
  const r = rate / 100 / 12
  const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n))
  const totalInterest = monthly * n - principal

  return (
    <div className="mortgage card">
      <h3>
        <Icon name="calculator" size={20} /> Mortgage calculator
      </h3>

      <div className="mortgage-result">
        <span>Estimated monthly payment</span>
        <strong>{formatPrice(Math.round(monthly))}</strong>
      </div>

      <label className="mortgage-row">
        <span>
          Down payment <b>{downPct}%</b> <em>{formatPrice(price * (downPct / 100))}</em>
        </span>
        <input type="range" min="0" max="80" step="5" value={downPct} onChange={(e) => setDownPct(+e.target.value)} />
      </label>

      <label className="mortgage-row">
        <span>
          Interest rate <b>{rate.toFixed(1)}%</b>
        </span>
        <input type="range" min="1" max="15" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} />
      </label>

      <div className="mortgage-row">
        <span>Loan term</span>
        <div className="segmented">
          {[10, 15, 20, 30].map((y) => (
            <button key={y} type="button" className={years === y ? "is-active" : ""} onClick={() => setYears(y)}>
              {y} yrs
            </button>
          ))}
        </div>
      </div>

      <dl className="mortgage-summary">
        <div>
          <dt>Loan amount</dt>
          <dd>{formatPrice(principal)}</dd>
        </div>
        <div>
          <dt>Total interest</dt>
          <dd>{formatPrice(Math.max(0, totalInterest))}</dd>
        </div>
      </dl>
    </div>
  )
}

export default MortgageCalculator
