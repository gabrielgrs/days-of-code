import withMiddlewares from 'services/withMiddlewares'
import publicationCollection from 'services/collections/publication'
import { decodeToken } from 'services/token'

async function request(req, res, { token }) {
  try {
    const { _id } = await decodeToken(token)
    const data = await publicationCollection.create({ ...req.body, likes: [], creator: _id })
    return res.status(201).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default withMiddlewares(request)
