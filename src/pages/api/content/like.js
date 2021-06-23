import withMiddlewares from 'services/withMiddlewares'
import contentCollection from 'services/collections/content'
import { decodeToken } from 'services/token'

async function request(req, res, { token }) {
  try {
    const { _id } = await decodeToken(token)
    const { contentId } = req.query

    const data = await contentCollection.findOne({ _id: contentId })
    const currentLikes = data?.likes || []
    const likes = currentLikes.includes(_id)
      ? currentLikes.filter((x) => x !== _id)
      : [...currentLikes, _id]

    await contentCollection.findOneAndUpdate({ _id: contentId }, { likes })

    return res.status(201).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default withMiddlewares(request)
