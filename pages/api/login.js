import { setCookies } from 'cookies-next'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).json({ status: 'Bad request' })
  const { username } = req.body
  if (!username) return res.status(400).json({ status: 'Bad request' })
  setCookies('username', username, {
    req,
    res,
    httpOnly: true,
  })
  res.status(200).json({ status: 'Ok' })
}
