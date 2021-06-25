import { generateLearningCounts } from 'helpers'
import userCollection from 'services/collections/user'
import { interceptLog } from 'services/log'
import withMiddlewares from 'services/withMiddlewares'

async function request(req, res) {
  try {
    const { username } = req.query

    const data = await userCollection.findOne({ username }).populate('learnings')

    const counts = generateLearningCounts(data.learnings)

    return res.status(200).send({ ...data.toObject(), counts })
  } catch (error) {
    return interceptLog(req, res, error)
  }
}

export default withMiddlewares(request)
