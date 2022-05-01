import loadCollection from '../../../lib/loadcollection'
import { ObjectId } from 'mongodb'
import checkAuth from '../../../lib/checkauth'

export default async function handler(req, res) {
  const username = checkAuth({ req, res })
  const challengesCollection = await loadCollection('challenges')
  if (!username) return res.status(401).json({ status: 'Not authorized' })
  if (req.method === 'POST') {
    const {
      bestOf,
      to,
      startingUrl
    } = req.body
    if (!bestOf || !to || !startingUrl) return res.status(400).json({ status: 'Bad request' })
    const challenge = {
      bestOf,
      to,
      from: username,
      rounds: [
        [
          {
            url: startingUrl,
            result: null
          }
        ]
      ]
    }
    const response = await challengesCollection.insertOne(challenge)
    return res.status(200).json({ _id: response.insertedId, ...challenge })
  }
  if (req.method === 'GET') {
    const query = {
      $or: [
        { to: username },
        { from: username }
      ]
    }
    const challenges = await challengesCollection.find(query).toArray()
    return res.status(200).json(challenges)
  }
}