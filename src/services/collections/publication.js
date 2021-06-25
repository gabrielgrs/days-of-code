import { Schema, model, models } from 'mongoose'
require('./user')

const schema = new Schema(
  {
    text: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
)

export default models?.publication || model('publication', schema)
