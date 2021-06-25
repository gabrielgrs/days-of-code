import md5 from 'md5'
import userCollection from 'services/collections/user'
import { interceptLog } from 'services/log'
import { generateToken } from 'services/token'
import withMiddlewares from 'services/withMiddlewares'

async function request(req, res) {
  try {
    const { password } = req.body

    const data = await userCollection.create({
      ...req.body,
      password: md5(password),
      learnings: [],
    })

    if (!data) return res.status(400).send({ message: 'Invalid user' })

    const { _id, email } = data
    const token = await generateToken({ _id, email })

    return res.status(200).send({ token, user: { ...data.toObject(), counts: {} } })
  } catch (error) {
    return interceptLog(req, res, error)
  }
}

export default withMiddlewares(request)
