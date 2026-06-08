import { Router } from 'express'
import Workout from '../models/workout'

const router = Router()

// GET /api/workouts/ - list workouts
router.get('/', async (_req, res) => {
  const workouts = await Workout.find().lean()
  res.json(workouts)
})

// POST /api/workouts/ - create workout
router.post('/', async (req, res) => {
  const doc = new Workout(req.body)
  await doc.save()
  res.status(201).json(doc)
})

export default router
