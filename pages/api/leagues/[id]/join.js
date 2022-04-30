import checkAuth from "../../../../lib/checkauth"
import { ObjectId } from 'mongodb'
import loadCollection from "../../../../lib/loadcollection"

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).json({ status: 'Bad request' }) 
  const leaguesCollection = await loadCollection('leagues')
  const username = checkAuth({ req, res })
  if (!username) return res.status(401).json({ status: 'Not authorized' })
  const { id } = req.query
  try {
    const query = { _id: ObjectId(id) }
  } catch {
    return res.status(400).json({ status: 'Invalid id' })
  }
  const league = await leaguesCollection.findOne(query)
  if (!league) return res.status(404).json({ status: 'Not found' })
  if (league.participants.includes(username)) {
    return res.status(400).json({ status: 'Already joined' })
  }
  const update = {
    $push: {
      participants: username
    }
  }
  const result = await leaguesCollection.updateOne(query, update)
  res.status(200).json({ status: 'Ok' })
}
