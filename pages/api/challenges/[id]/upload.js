import { ObjectId } from 'mongodb'
import checkAuth from '../../../../lib/checkauth'
import getPoints from '../../../../lib/getpoints'
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
  if (req.method === 'POST') {
    const challenge = await challengesCollection.findOne(query)
    let round = challenge.rounds.length - 1
    if (round === challenge.bestOf - 1 && challenge.rounds[round][1] && challenge.rounds[round][1].result) {
      return res.status(400).json({ status: 'Bad request' })
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
      round++
    }
    if (challenge.nextStep.step !== 'upload' || challenge.nextStep.user !== username) return res.status(400).json({ status: 'Bad request' })
    const { url } = req.body
    if (!url) return res.status(400).json({ status: 'Bad request' })
    const turn = challenge.from === username ? 0 : 1
    const replacement = { ...challenge }
    delete replacement.nextStep
    if (turn === 0) replacement.rounds[round] = [{}]
    if (turn === 1) replacement.rounds[round][turn] = {}
    replacement.rounds[round][turn].url = url
    const response = await challengesCollection.replaceOne(query, replacement)
    if (response.modifiedCount === 1) return res.status(200).json({ status: 'Ok'} )
    return res.status(500).json({ status: 'Something went wrong' })
  }
}
