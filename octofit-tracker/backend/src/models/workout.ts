import { Schema, model, Types } from 'mongoose'

const WorkoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  durationMinutes: { type: Number },
  exercises: [{ name: String, reps: Number, sets: Number }],
  createdAt: { type: Date, default: () => new Date() }
})

export default model('Workout', WorkoutSchema)
