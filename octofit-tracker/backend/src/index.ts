import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = Number(process.env.PORT || 8000)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'

// Codespaces-aware public API URL
// If running in a Codespace, construct the preview URL using the pattern:
//   https://<CODESPACE_NAME>-8000.app.github.dev
// Otherwise, fall back to localhost
const PUBLIC_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API' })
})

// Expose runtime API config (helpful for frontend in Codespaces)
app.get('/api/config', (_req, res) => {
  res.json({ apiUrl: PUBLIC_URL })
})

// Mount API routers
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

const HOST = '0.0.0.0'
app.listen(PORT, HOST, () => {
  console.log(`API listening on ${HOST}:${PORT}`)
  console.log(`Public API URL: ${PUBLIC_URL}`)
})
