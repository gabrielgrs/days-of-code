import { Schema, model, models } from 'mongoose'

const schema = new Schema(
  {
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
