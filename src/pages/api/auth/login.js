import { generateLearningCounts } from 'helpers'
import md5 from 'md5'
import userCollection from 'services/collections/user'
import { interceptLog } from 'services/log'
import { generateToken } from 'services/token'
import withMiddlewares from 'services/withMiddlewares'

async function request(req, res) {
  try {
    const { email, password } = req.body
    const data = await userCollection
      .findOne({ email, password: md5(password) })
      .populate('learnings')

    if (!data) return res.status(400).send({ message: 'Invalid user' })

    const { _id, learnings } = data

    const token = await generateToken({ _id })

    const counts = generateLearningCounts(learnings)

    return res.status(200).send({ token, user: { ...data.toObject(), counts } })
  } catch (error) {
    return interceptLog(req, res, error)
  }
}

export default withMiddlewares(request)
