import checkAuth from "../../../../lib/checkauth"
import { ObjectId } from 'mongodb'
import loadCollection from "../../../../lib/loadcollection"

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(400).json({ status: 'Bad request' }) 
  const leaguesCollection = await loadCollection('leagues')
  const resultsCollection = await loadCollection('results')
  const username = checkAuth({ req, res })
  if (!username) return res.status(401).json({ status: 'Not authorized' })
  const { id } = req.query
  let query
  try {
    query = { _id: ObjectId(id) }
  } catch {
    return res.status(400).json({ status: 'Invalid id' })
  }   
  const league = await leaguesCollection.findOne(query)
  if (!league) return res.status(404).json({ status: 'Not found' })
  query = {
    username: {
      $in: league.participants
    },
    typeUrl: league.typeUrl
  }
  const results = await resultsCollection.find(query).toArray()
  const scoreboard = {}
  for (const result of results) {
    if (scoreboard[result.username]) {
      scoreboard[result.username].results += 1
      scoreboard[result.username].points += result.points
    } else {
      scoreboard[result.username] = {}
      scoreboard[result.username].results = 1
      scoreboard[result.username].points = result.points
    }
  }
  const response = Object.keys(scoreboard).map(k => {
    return {
      username: k,
      results: scoreboard[k].results,
      points: scoreboard[k].points
    }
  })
  res.status(200).json({
    position: response.sort((a, b) => b.points - a.points).findIndex(r => r.username === username) + 1,
    scoreboard: response.sort((a, b) => b.points - a.points).map((x, i) => {
      return { ...x, position: i + 1 }
    })
  })
}