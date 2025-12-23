const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json({ limit: '1mb' }))

const dataDir = path.join(__dirname, 'data')
const contactsFile = path.join(dataDir, 'contacts.json')

function ensureStore() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true })
  if (!fs.existsSync(contactsFile)) fs.writeFileSync(contactsFile, JSON.stringify([], null, 2), 'utf8')
}

function readContacts() {
  ensureStore()
  const raw = fs.readFileSync(contactsFile, 'utf8')
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeContacts(list) {
  ensureStore()
  fs.writeFileSync(contactsFile, JSON.stringify(list, null, 2), 'utf8')
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'sparkle-clean-server', time: new Date().toISOString() })
})

app.get('/api/contact', (req, res) => {
  const contacts = readContacts()
  res.json({ count: contacts.length, contacts })
})

app.post('/api/contact', (req, res) => {
  const { name, email, phone, service, message } = req.body || {}

  if (!name || !email || !service) {
    return res.status(400).json({ error: 'name, email, and service are required' })
  }

  const contacts = readContacts()
  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: String(name),
    email: String(email),
    phone: phone ? String(phone) : '',
    service: String(service),
    message: message ? String(message) : '',
    createdAt: new Date().toISOString(),
  }

  contacts.unshift(entry)
  writeContacts(contacts)

  return res.status(201).json({ message: 'Saved', contact: entry })
})

app.listen(PORT, () => {
  console.log(`SparkleClean backend running on http://localhost:${PORT}`)
})
