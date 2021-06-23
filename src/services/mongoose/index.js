import mongoose from 'mongoose'

mongoose.Promise = global.Promise

let isConnected = false

export async function upDatabase() {
  if (isConnected) return Promise.resolve()

  const db = await mongoose.connect(process.env.DATABASE, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  isConnected = !!db.connections[0].readyState
  return db
}
