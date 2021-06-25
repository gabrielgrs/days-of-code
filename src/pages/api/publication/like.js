import withMiddlewares from 'services/withMiddlewares'
import publicationCollection from 'services/collections/publication'
import { decodeToken } from 'services/token'

async function request(req, res, { token }) {
  try {
    const { _id } = await decodeToken(token)
    const { publicationId } = req.query

    const data = await publicationCollection.findOne({ _id: publicationId })
    const currentLikes = data?.likes || []
    const likes = currentLikes.includes(_id)
      ? currentLikes.filter((x) => x !== _id)
      : [...currentLikes, _id]

    await publicationCollection.findOneAndUpdate({ _id: publicationId }, { likes })

    return res.status(201).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default withMiddlewares(request)
