import { removeCookies } from 'cookies-next'
import checkAuth from '../../lib/checkauth'

export default async function handler(req, res) {
  if (!checkAuth({ req, res })) return res.status(401).json({ status: 'Not authorized' })
  if (req.method !== 'GET') return res.status(400).json({ status: 'Bad request' })
  removeCookies('username', { req, res })
  res.status(200).json({ status: 'Ok' })
}
