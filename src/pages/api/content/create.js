import withMiddlewares from 'services/withMiddlewares'
import contentCollection from 'services/collections/content'

async function request(req, res) {
  try {
    const data = await contentCollection.create(req.body)
    return res.status(201).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default withMiddlewares(request)
