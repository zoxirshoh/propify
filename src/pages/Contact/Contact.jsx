import { useState } from "react"
import { Link } from "react-router-dom"
import Icon from "../../components/Icon/Icon"
import { useApp } from "../../context/app-context"
import "./Contact.css"

const channels = [
  { icon: "phone", title: "Call us", value: "+998 77 355 21 05", href: "tel:+998773552105", note: "Mon–Sat, 9:00–19:00" },
  { icon: "mail", title: "Email", value: "info@propify.uz", href: "mailto:info@propify.uz", note: "Reply within 24 hours" },
  { icon: "pin", title: "Office", value: "Amir Temur Ave 108", href: null, note: "Tashkent, Uzbekistan" },
]

const faqs = [
  {
    q: "How do I schedule a viewing?",
    a: "Open any property and send a message to the agent, or fill in the form on this page. We'll call you back to agree on a time.",
  },
  {
    q: "Do you charge buyers a fee?",
    a: "No — our services are free for buyers. Sellers pay a transparent commission agreed before listing.",
  },
  {
    q: "Can you help with a mortgage?",
    a: "Yes. Our partners offer mortgage consultations, and every listing has a built-in mortgage calculator.",
  },
  {
    q: "How quickly can I sell my property?",
    a: "Most well-priced homes on Propify sell within 30–60 days. We start with a free valuation.",
  },
]

const initial = { name: "", email: "", phone: "", topic: "Buying", message: "" }

const Contact = () => {
  const { notify } = useApp()
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: "" }))
  }

  const submit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = "Please enter your name"
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email"
    if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters"
    if (Object.keys(next).length) return setErrors(next)

    setSending(true)
    setTimeout(() => {
      setSending(false)
      setForm(initial)
      notify("Thanks! We'll get back to you shortly.")
    }, 1000)
  }

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link> / <span>Contact</span>
          </nav>
          <h1>Let's talk about your next move</h1>
          <p>Questions about a listing, selling your home or investing? Our experts are here to help.</p>
        </div>
      </section>

      <div className="container contact">
        <div className="contact-channels">
          {channels.map((c) => {
            const Tag = c.href ? "a" : "div"
            return (
              <Tag key={c.title} className="contact-channel card" {...(c.href ? { href: c.href } : {})}>
                <span className="contact-icon">
                  <Icon name={c.icon} size={22} />
                </span>
                <div>
                  <span className="contact-label">{c.title}</span>
                  <strong>{c.value}</strong>
                  <small>{c.note}</small>
                </div>
              </Tag>
            )
          })}
        </div>

        <div className="contact-grid">
          <form className="contact-form card" onSubmit={submit} noValidate>
            <h2>Send us a message</h2>
            <div className="contact-row">
              <div className="field">
                <label htmlFor="c-name">Full name *</label>
                <input id="c-name" name="name" className={`input ${errors.name ? "has-error" : ""}`} value={form.name} onChange={update} />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="field">
                <label htmlFor="c-email">Email *</label>
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  className={`input ${errors.email ? "has-error" : ""}`}
                  value={form.email}
                  onChange={update}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>
            <div className="contact-row">
              <div className="field">
                <label htmlFor="c-phone">Phone</label>
                <input id="c-phone" name="phone" type="tel" className="input" value={form.phone} onChange={update} />
              </div>
              <div className="field">
                <label htmlFor="c-topic">I'm interested in</label>
                <select id="c-topic" name="topic" className="input" value={form.topic} onChange={update}>
                  <option>Buying</option>
                  <option>Renting</option>
                  <option>Selling</option>
                  <option>Investing</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="c-message">Message *</label>
              <textarea
                id="c-message"
                name="message"
                rows={5}
                className={`input ${errors.message ? "has-error" : ""}`}
                value={form.message}
                onChange={update}
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={sending}>
              {sending ? <span className="spinner" /> : <Icon name="send" size={18} />} Send message
            </button>
          </form>

          <div className="faq">
            <h2>Frequently asked questions</h2>
            {faqs.map((f, i) => {
              const open = openFaq === i
              return (
                <div key={f.q} className={`faq-item ${open ? "is-open" : ""}`}>
                  <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open}>
                    {f.q}
                    <Icon name="chevronDown" size={18} />
                  </button>
                  <div className="faq-answer">
                    <p>{f.a}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
