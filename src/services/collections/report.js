import { Schema, model, models } from 'mongoose'
require('./user')
require('./report')

const schema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: Schema.Types.ObjectId, ref: 'content', required: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
)

const reportCollection = models?.report || model('report', schema)
export default reportCollection
