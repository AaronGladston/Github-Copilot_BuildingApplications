import { Schema, model, Types } from 'mongoose'

const ActivitySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number },
  date: { type: Date, default: () => new Date() }
})

export default model('Activity', ActivitySchema)
