import { Router } from 'express'
import Team from '../models/team'

const router = Router()

// GET /api/teams/ - list teams
router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean()
  res.json(teams)
})

// POST /api/teams/ - create team
router.post('/', async (req, res) => {
  const doc = new Team(req.body)
  await doc.save()
  res.status(201).json(doc)
})

export default router
