import { useMemo, useState } from 'react'

export default function Contact() {
  const apiBaseUrl = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5001', [])

  const [submissions, setSubmissions] = useState([])
  const [submissionsStatus, setSubmissionsStatus] = useState({ type: 'idle', message: '' })

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const loadSubmissions = async () => {
    setSubmissionsStatus({ type: 'loading', message: 'Loading submissions...' })
    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`)
      if (!res.ok) throw new Error('Failed to load submissions')
      const data = await res.json()
      setSubmissions(Array.isArray(data?.contacts) ? data.contacts : [])
      setSubmissionsStatus({ type: 'success', message: `Loaded ${data?.count ?? 0} submissions.` })
    } catch (e) {
      setSubmissionsStatus({ type: 'error', message: 'Backend not reachable. Start the server and try again.' })
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Sending...' })

    try {
      const res = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || 'Failed to send message')
      }

      setStatus({ type: 'success', message: 'Thank you! Your message has been saved.' })
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch (error) {
      const existing = JSON.parse(localStorage.getItem('sparkleclean_contacts') || '[]')
      localStorage.setItem(
        'sparkleclean_contacts',
        JSON.stringify([...existing, { ...form, savedAt: new Date().toISOString() }]),
      )
      setStatus({ type: 'warning', message: 'Saved locally (server not running). Start backend for DB connectivity.' })
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get in Touch</h2>
        <div className="contact-container">
          <form className="contact-form" onSubmit={onSubmit}>
            <input name="name" type="text" placeholder="Your Name" value={form.name} onChange={onChange} required />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={onChange}
              required
            />
            <input name="phone" type="tel" placeholder="Phone Number" value={form.phone} onChange={onChange} />
            <select name="service" value={form.service} onChange={onChange} required>
              <option value="">Select Service</option>
              <option value="residential">Residential Cleaning</option>
              <option value="commercial">Commercial Cleaning</option>
              <option value="deep">Deep Cleaning</option>
            </select>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={onChange}
            />
            <button type="submit" className="btn btn-primary" disabled={status.type === 'loading'}>
              {status.type === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {status.type !== 'idle' ? (
              <div className={`form-status ${status.type}`}>{status.message}</div>
            ) : null}
          </form>

          <div className="contact-info reveal">
            <h3>Contact Information</h3>
            <p>
              <i className="fas fa-phone" aria-hidden="true" /> +1 (555) 123-4567
            </p>
            <p>
              <i className="fas fa-envelope" aria-hidden="true" /> info@sparkleclean.com
            </p>
            <p>
              <i className="fas fa-map-marker-alt" aria-hidden="true" /> 123 Clean Street, City, Country
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter" aria-hidden="true" />
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <h3 style={{ textAlign: 'center', marginBottom: 12 }}>Admin Demo: Saved Contact Submissions</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-secondary" onClick={loadSubmissions}>
            Load Submissions
          </button>
        </div>
        {submissionsStatus.type !== 'idle' ? (
          <div className={`form-status ${submissionsStatus.type}`} style={{ maxWidth: 900, margin: '0 auto' }}>
            {submissionsStatus.message}
          </div>
        ) : null}

        {submissions.length ? (
          <div style={{ maxWidth: 900, margin: '14px auto 0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #eee' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #eee' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #eee' }}>Service</th>
                  <th style={{ textAlign: 'left', padding: 10, borderBottom: '1px solid #eee' }}>Created</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id}>
                    <td style={{ padding: 10, borderBottom: '1px solid #f2f2f2' }}>{s.name}</td>
                    <td style={{ padding: 10, borderBottom: '1px solid #f2f2f2' }}>{s.email}</td>
                    <td style={{ padding: 10, borderBottom: '1px solid #f2f2f2' }}>{s.service}</td>
                    <td style={{ padding: 10, borderBottom: '1px solid #f2f2f2' }}>
                      {s.createdAt ? new Date(s.createdAt).toLocaleString() : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </section>
  )
}
