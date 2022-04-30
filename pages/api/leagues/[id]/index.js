import loadCollection from '../../../../lib/loadcollection'
import { ObjectId } from 'mongodb'
import checkAuth from '../../../../lib/checkauth'

export default async function handler(req, res) {
  if (!checkAuth({ req, res })) return res.status(401).json({ status: 'Not authorized' })
  const leaguesCollection = await loadCollection('leagues')
  const { id } = req.query
  let query
  try {
    query = { _id: ObjectId(id) }
  } catch {
    return res.status(400).json({ status: 'Invalid id' })
  }

  if (req.method === 'GET') {
    const league = await leaguesCollection.findOne(query)

    if (!league) return res.status(404).json({ status: 'Not found' })
    return res.status(200).json(league)
  }
  if (req.method === 'DELETE') {
    const result = await leaguesCollection.deleteOne(query)

    if (result.deletedCount === 0) return res.status(404).json({ status: 'Not found' })
    return res.status(200).json({ status: 'Ok' })
  }
}
