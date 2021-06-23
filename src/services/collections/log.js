import { Schema, model, models } from 'mongoose'

const schema = new Schema(
  {
    authenticatedUser: { type: Schema.Types.ObjectId, ref: 'user' },
    path: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
)

const logCollection = models?.log || model('log', schema)
export default logCollection
