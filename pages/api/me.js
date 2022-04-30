import loadCollection from '../../lib/loadcollection'
import checkAuth from '../../lib/checkauth'

export default async function handler(req, res) {
  const username =  checkAuth({ res, req })
  if (!username) return res.status(401).json({ status: 'Not authorized' })
  const leaguesCollection = await loadCollection('leagues')
  const resultsCollection = await loadCollection('results')
  const leagues = await leaguesCollection.find({ participants: username }).toArray()
  const results = await resultsCollection.find({ username }).toArray()
  res.status(200).json({
    username,
    leagues: leagues.length,
    points: results.reduce((prev, curr) => curr.points + prev, 0),
    results: results.length
  })
}