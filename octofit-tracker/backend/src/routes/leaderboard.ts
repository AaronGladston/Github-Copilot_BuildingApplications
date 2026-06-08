import { Router } from 'express'
import Leaderboard from '../models/leaderboard'

const router = Router()

// GET /api/leaderboard/ - leaderboard
router.get('/', async (_req, res) => {
  const list = await Leaderboard.find().populate('user').sort({ score: -1 }).lean()
  res.json(list)
})

export default router
