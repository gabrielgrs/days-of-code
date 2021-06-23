import withMiddlewares from 'services/withMiddlewares'
import contentCollection from 'services/collections/content'

function createFilters(query) {
  if (!Object.keys(query).length) return {}

  return Object.keys(query).reduce((acc, curr) => {
    if (query[curr].includes(',')) {
      const arr = query[curr].split(',')
      acc[curr] = { $in: arr }
    } else if (typeof query[curr] === 'string') {
      acc[curr] = new RegExp(query[curr], 'i')
    }
    return acc
  }, {})
}

async function request(req, res) {
  try {
    const { limit, ...rest } = req.query
    const querySearch = createFilters(rest)

    const data = await contentCollection.find(querySearch).limit(+limit)
    const totalRecords = await contentCollection.find(querySearch).countDocuments()

    res.setHeader('x-total-records', totalRecords)

    return res.status(200).send(data)
  } catch (error) {
    return res.status(500).send(error)
  }
}

export default withMiddlewares(request)
