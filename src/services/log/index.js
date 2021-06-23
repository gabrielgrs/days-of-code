import { Types } from 'mongoose'
import logCollection from 'services/collections/log'
import { decodeToken } from 'services/token'

export async function interceptLog(req, res, error) {
  const token = req.headers['x-access-token']
  const parsedError = error?.toString() || String(error)

  const path = req.url
  const message = parsedError

  if (token) {
    const decodedToken = await decodeToken(token)
    const { _id } = decodedToken
    const isValidId = Types.ObjectId.isValid(_id)
    if (_id && isValidId) {
      logCollection.create({ authenticatedUser: _id, path, message })
    }
  } else {
    logCollection.create({ path, message })
  }

  // eslint-disable-next-line
  console.error('parsedError', parsedError)

  return res.status(500).send({ error: parsedError })
}
