import md5 from 'md5'
import userCollection from 'services/collections/user'
import { interceptLog } from 'services/log'
import { decodeToken } from 'services/token'
import withMiddlewares from 'services/withMiddlewares'

async function request(req, res, { token }) {
  try {
    const { _id } = await decodeToken(token)
    const { password, currentPassword } = req.body

    if (password !== currentPassword) throw Error('Invalid')
    const newPassword = md5(password)

    await userCollection.findOneAndUpdate({ _id }, { password: newPassword, ...req.body })

    return res.status(200).send({ message: 'Success' })
  } catch (error) {
    return interceptLog(req, res, error)
  }
}

export default withMiddlewares(request)
