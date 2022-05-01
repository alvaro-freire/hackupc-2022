
import { ObjectId } from 'mongodb'
import checkAuth from '../../../../lib/checkauth'
import loadCollection from '../../../../lib/loadcollection'


export default async function handler(req, res) {
  const username = checkAuth({ req, res })
  if (!username) return res.status(401).json({ status: 'Not authorized' })
  const { id } = req.query
  let query
  try {
    query = { _id: ObjectId(id) }
  } catch {
    return res.status(400).json({ status: 'Invalid id' })
  }
  const challengesCollection = await loadCollection('challenges')
  if (req.method === 'GET') {
    const challenge = await challengesCollection.findOne(query)
    let myPoints = 0
    let rivalPoints = 0
    for (const { result } of challenge.rounds.flat()) {
      if (result.username === username) {
        myPoints += result.points
      } else {
        rivalPoints += result.points
      }
    }
    const round = challenge.rounds.length - 1
    if (round === challenge.bestOf - 1 && challenge.rounds[round][1] && challenge.rounds[round][1].result) {
      return res.status(200).json({ ...challenge, myPoints, rivalPoints, round })
    }
    if (!challenge.rounds[round][0]) {
      challenge.nextStep = {
        user: challenge.from,
        step: 'upload'
      }
    } else if (!challenge.rounds[round][0].result) {
      challenge.nextStep = {
        user: challenge.to,
        step: 'solve',
        url: challenge.rounds[round][0].url
      }
    } else if (!challenge.rounds[round][1]) {
      challenge.nextStep = {
        user: challenge.to,
        step: 'upload'
      }
    } else if (!challenge.rounds[round][1].result) {
      challenge.nextStep = {
        user: challenge.from,
        step: 'solve',
        url: challenge.rounds[round][1].url
      }
    } else {
      challenge.nextStep = {
        user: challenge.from,
        step: 'upload'
      }
    }
    return res.status(200).json({ ...challenge, myPoints, rivalPoints, round })
  }
}