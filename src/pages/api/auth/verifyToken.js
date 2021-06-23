import userCollection from 'services/collections/user'
import { interceptLog } from 'services/log'
import { decodeToken, generateToken } from 'services/token'
import withMiddlewares from 'services/withMiddlewares'

async function request(req, res, { token }) {
  try {
    const { _id } = await decodeToken(token)

    const data = await userCollection.findOne({ _id })

    const { nickname } = data
    const refreshedToken = await generateToken({ _id, nickname })

    return res.status(200).send({ token: refreshedToken, user: data })
  } catch (error) {
    return interceptLog(req, res, error)
  }
}

export default withMiddlewares(request)
