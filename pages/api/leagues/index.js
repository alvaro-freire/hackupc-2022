import checkAuth from '../../../lib/checkauth'
import loadCollection from '../../../lib/loadcollection'

export default async function handler(req, res) {
  if (!checkAuth({ req, res })) return res.status(401).json({ status: 'Not authorized' })
  const leaguesCollection = await loadCollection('leagues')
  if (req.method === 'POST') {
    const { name, typeUrl } = req.body
    if (!name || !typeUrl) return res.status(400).json({ status: 'Bad request' })

    const league = {
      name,
      typeUrl,
      participants: []
    }
    const inserted = await leaguesCollection.insertOne(league)

    return res.status(200).json(league)
  }
  if (req.method === 'GET') {
    const leagues = await leaguesCollection.find().toArray()

    return res.status(200).json(leagues)
  }
}
