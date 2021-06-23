import md5 from 'md5'
import userCollection from 'services/collections/user'
import { interceptLog } from 'services/log'
import { generateToken } from 'services/token'
import withMiddlewares from 'services/withMiddlewares'

async function request(req, res) {
  try {
    const { email, password } = req.body

    const data = await userCollection.create({ email, password: md5(password) })

    if (!data) return res.status(400).send({ message: 'Invalid user' })

    const { _id } = data
    const token = await generateToken({ _id, email })

    return res.status(200).send({ token, user: data })
  } catch (error) {
    return interceptLog(req, res, error)
  }
}

export default withMiddlewares(request)
