import { Router } from 'express'
import Activity from '../models/activity'

const router = Router()

// GET /api/activities/ - list activities
router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean()
  res.json(activities)
})

// POST /api/activities/ - create activity
router.post('/', async (req, res) => {
  const doc = new Activity(req.body)
  await doc.save()
  res.status(201).json(doc)
})

export default router
