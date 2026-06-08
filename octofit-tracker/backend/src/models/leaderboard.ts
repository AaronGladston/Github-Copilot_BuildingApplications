import { Schema, model, Types } from 'mongoose'

const LeaderboardSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  rank: { type: Number },
  updatedAt: { type: Date, default: () => new Date() }
})

export default model('Leaderboard', LeaderboardSchema)
