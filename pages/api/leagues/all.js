import checkAuth from '../../../lib/checkauth'
import loadCollection from '../../../lib/loadcollection'

export default async function handler(req, res) {
  const username = checkAuth({ req, res })
  if (!username) return res.status(401).json({ status: 'Not authorized' })
  const leaguesCollection = await loadCollection('leagues')
  if (req.method === 'GET') {
    const leagues = await leaguesCollection.find().toArray()

    return res.status(200).json(leagues)
  }
}