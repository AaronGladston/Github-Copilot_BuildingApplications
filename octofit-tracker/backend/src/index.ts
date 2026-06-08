import express from 'express'
import mongoose from 'mongoose'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API' })
})

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`)
})
