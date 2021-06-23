import jwt from 'jsonwebtoken'

export function isValidToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export function decodeToken(token) {
  return jwt.decode(token, process.env.JWT_SECRET)
}

export async function isAdmin(token) {
  const decoded = await decodeToken(token)
  if (!decoded.isAdmin) throw Error('Unauthorized access')
  return Boolean(decoded.isAdmin)
}

export function generateToken(tokenData) {
  return jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' })
}
