import withMiddlewares from 'services/withMiddlewares'
import userCollection from 'services/collections/user'
import { decodeToken } from 'services/token'

async function request(req, res, { token }) {
  try {
    const { _id } = await decodeToken(token)
    const { contentId } = req.query

    const data = await userCollection.findOne({ _id })

    const currentLearned = data?.learnings || []
    const learnings = currentLearned.includes(contentId)
      ? currentLearned.filter((x) => x !== contentId)
      : [...currentLearned, contentId]

    await userCollection.findOneAndUpdate({ _id }, { learnings })

    return res.status(201).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default withMiddlewares(request)
