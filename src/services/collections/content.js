import { languages, levels, technologies } from 'helpers'
import { Schema, model, models } from 'mongoose'

const schema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, required: true },
    technologies: [{ type: String, required: true, role: technologies }],
    level: { type: String, required: true, role: levels },
    language: { type: String, required: true, role: languages },
    // author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
)

export default models?.content || model('content', schema)
