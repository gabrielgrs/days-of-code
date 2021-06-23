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

    const { _id, nickname, learnings = [] } = data

    const token = await generateToken({ _id, nickname })

    const counts = learnings.reduce((acc, curr) => {
      curr.technologies.map((tech) => {
        if (acc[tech]) {
          acc[tech] += acc[tech] + 1
        } else {
          acc[tech] = 1
        }
      })
      return acc
    }, {})

    return res.status(200).send({ token, user: { ...data.toObject(), counts } })
  } catch (error) {
    return interceptLog(req, res, error)
  }
}

export default withMiddlewares(request)
