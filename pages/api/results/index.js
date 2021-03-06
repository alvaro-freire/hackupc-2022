import checkAuth from '../../../lib/checkauth'
import loadCollection from '../../../lib/loadcollection'
import getPoints from '../../../lib/getpoints'

export default async function handler(req, res) {
  const username = checkAuth({ req, res })
  const resultsCollection = await loadCollection('results')
  if (!username) return res.status(401).json({ status: 'Not authorized' })
  if (req.method === 'POST') {
    const { result } = req.body
    const lines = result.split('\n').filter(r => r !== "")
    const head = lines[0]
    const typeUrl = lines[lines.length - 1]
    const emojis = lines.slice(1, -1)
    const points = getPoints(emojis)
    const preparedResult = { username, head, typeUrl, emojis, points, date: new Date() }
    const response = await resultsCollection.insertOne(preparedResult)
    return res.status(200).json({ ...preparedResult, _id: response.insertedId })
  }
  if (req.method === 'GET') {
    const results = await resultsCollection.find().toArray()
    return res.status(200).json(results)
  }
}