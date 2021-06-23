import { upDatabase } from 'services/mongoose'

const withMiddlewares = (callback) => async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']

    await upDatabase()
    return callback(req, res, { next, token })
  } catch (error) {
    return res.send(error)
  }
}

export default withMiddlewares
