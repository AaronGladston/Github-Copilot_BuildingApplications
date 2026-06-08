import { Router } from 'express'
import User from '../models/user'

const router = Router()

// GET /api/users/ - list users
router.get('/', async (_req, res) => {
  const users = await User.find().lean()
  res.json(users)
})

// POST /api/users/ - create user
router.post('/', async (req, res) => {
  const doc = new User(req.body)
  await doc.save()
  res.status(201).json(doc)
})

export default router
