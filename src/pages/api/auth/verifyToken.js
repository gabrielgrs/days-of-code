import userCollection from 'services/collections/user'
import { interceptLog } from 'services/log'
import { decodeToken, generateToken } from 'services/token'
import withMiddlewares from 'services/withMiddlewares'

async function request(req, res, { token }) {
  try {
    const { _id } = await decodeToken(token)

    const data = await userCollection.findOne({ _id }).populate('learnings')

    const { username, learnings } = data
    const refreshedToken = await generateToken({ _id, username })

    const counts = learnings.reduce((acc, curr) => {
      curr.technologies.map((tech) => {
        if (acc[tech]) {
          acc[tech] = acc[tech] + 1
        } else {
          acc[tech] = 1
        }
      })
      return acc
    }, {})

    return res.status(200).send({ token: refreshedToken, user: { ...data.toObject(), counts } })
  } catch (error) {
    return interceptLog(req, res, error)
  }
}

export default withMiddlewares(request)
