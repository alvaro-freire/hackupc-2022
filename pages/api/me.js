import checkAuth from '../../lib/checkauth'

export default async function handler(req, res) {
  const username =  checkAuth({ res, req })
  if (!username) return res.status(401).json({ status: 'Not authorized' })
  res.status(200).json({ username })
}