import checkAuth from '../../../lib/checkauth'
import loadCollection from '../../../lib/loadcollection'

function getPoints(emojis) {
  let points = 0
  for (const line of emojis) {
    for (const emoji of line) {
      switch (emoji) {
        case '⬜':
          points -= 10;
          break;
        case '🟨':
          points += 10;
          break;
        case '🟩':
          points += 20;
          break;
      }
    }
  }
  return points
}

export default async function handler(req, res) {
  const username = checkAuth({ req, res })
  if (!username) return res.status(401).json({ status: 'Not authorized' })
  const { result } = req.body
  const lines = result.split('\n').filter(r => r !== "");
  const head = lines[0]
  const typeUrl = lines[lines.length - 1]
  const emojis = lines.slice(1, -1)
  const points = getPoints(emojis)
  const preparedResult = { username, head, typeUrl, emojis, points }
  const resultsCollection = await loadCollection('results')
  const response = await resultsCollection.insertOne(preparedResult)
  res.status(200).json({ ...preparedResult, _id: response.insertedId })
}