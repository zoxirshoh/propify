import { useApp } from "../../context/app-context"
import Icon from "../Icon/Icon"
import "./Toast.css"

const icons = { success: "check", info: "heart", error: "close" }

const Toast = () => {
  const { toasts, dismissToast } = useApp()
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          <span className="toast-icon">
            <Icon name={icons[t.type] || "check"} size={16} />
          </span>
          <span className="toast-msg">{t.message}</span>
          <button type="button" className="toast-close" onClick={() => dismissToast(t.id)} aria-label="Dismiss">
            <Icon name="close" size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
