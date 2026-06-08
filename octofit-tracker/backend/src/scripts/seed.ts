import mongoose from 'mongoose'
import User from '../models/user'
import Team from '../models/team'
import Activity from '../models/activity'
import Workout from '../models/workout'
import Leaderboard from '../models/leaderboard'

// Seed the octofit_db database with test data
async function seed() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit_db'
  console.log('Connecting to', MONGO_URI)
  await mongoose.connect(MONGO_URI)

  console.log('Clearing existing data...')
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  console.log('Inserting sample users...')
  const users = await User.create([
    { name: 'Mona Patel', email: 'mona@example.com' },
    { name: 'Alex Kim', email: 'alex@example.com' },
    { name: 'Jordan Smith', email: 'jordan@example.com' }
  ])

  console.log('Creating teams...')
  const teamA = await Team.create({ name: 'OctoRunners', members: [users[0]._id, users[1]._id] })
  const teamB = await Team.create({ name: 'FitSquad', members: [users[2]._id] })

  console.log('Creating workouts...')
  const w1 = await Workout.create({ title: 'Full Body HIIT', description: 'High-intensity interval training', durationMinutes: 30, exercises: [{ name: 'Burpees', reps: 10, sets: 3 }] })
  const w2 = await Workout.create({ title: 'Morning Run', description: 'Easy paced 5K run', durationMinutes: 28 })

  console.log('Creating activities...')
  await Activity.create([
    { user: users[0]._id, type: 'run', durationMinutes: 28, calories: 320 },
    { user: users[1]._id, type: 'cycling', durationMinutes: 45, calories: 540 },
    { user: users[2]._id, type: 'workout', durationMinutes: 30, calories: 400 }
  ])

  console.log('Creating leaderboard entries...')
  await Leaderboard.create([
    { user: users[1]._id, score: 1250, rank: 1 },
    { user: users[0]._id, score: 980, rank: 2 },
    { user: users[2]._id, score: 720, rank: 3 }
  ])

  console.log('Seed complete. Counts:')
  const counts = {
    users: await User.countDocuments(),
    teams: await Team.countDocuments(),
    workouts: await Workout.countDocuments(),
    activities: await Activity.countDocuments(),
    leaderboard: await Leaderboard.countDocuments()
  }
  console.log(counts)

  // Verify via local API endpoints if available
  try {
    const base = process.env.API_URL || 'http://localhost:8000'
    console.log('Verifying via API at', base)
    const usersRes = await fetch(`${base}/api/users`)
    const usersData = await usersRes.json()
    console.log('/api/users returned', usersData.length || usersData.length === 0 ? usersData.length : Object.keys(usersData).length)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.log('API verification skipped or failed:', msg)
  }

  await mongoose.disconnect()
}

seed().catch(err => {
  console.error('Seed error:', err)
  process.exit(1)
})
