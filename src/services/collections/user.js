import { Schema, model, models } from 'mongoose'
require('./content')

const schema = new Schema(
  {
    name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    learnings: [{ type: Schema.Types.ObjectId, ref: 'content' }],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
)

const userCollection = models?.user || model('user', schema)
export default userCollection
