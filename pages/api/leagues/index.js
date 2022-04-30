import checkAuth from '../../../lib/checkauth'
import loadCollection from '../../../lib/loadcollection'

export default async function handler(req, res) {
  const username = checkAuth({ req, res })
  if (!username) return res.status(401).json({ status: 'Not authorized' })
  const leaguesCollection = await loadCollection('leagues')
  if (req.method === 'POST') {
    const { name, typeUrl, key } = req.body
    if (!name || !typeUrl || !key) return res.status(400).json({ status: 'Bad request' })

    const league = {
      name,
      typeUrl,
      key,
      participants: [username],
      date: new Date()
    }
    const inserted = await leaguesCollection.insertOne(league)

    return res.status(200).json(league)
  }
  if (req.method === 'GET') {
    const leagues = await leaguesCollection.find({
      participants: username
    }).toArray()
    leagues.forEach(l => {
      delete l.key
    });
    return res.status(200).json(leagues)
  }
}
