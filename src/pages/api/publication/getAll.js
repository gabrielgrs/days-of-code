import withMiddlewares from 'services/withMiddlewares'
import publicationCollection from 'services/collections/publication'

async function request(req, res) {
  try {
    const { limit } = req.query

    const data = await publicationCollection
      .find()
      .sort({ createdAt: -1 })
      .limit(+limit)
      .populate('creator')
    const totalRecords = await publicationCollection.find().countDocuments()

    res.setHeader('x-total-records', totalRecords)

    return res.status(200).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default withMiddlewares(request)
