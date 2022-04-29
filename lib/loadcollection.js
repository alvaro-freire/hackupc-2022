import clientPromise from './mongodb'

async function loadCollection(name) {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB)
  return db.collection(name)
}

export default loadCollection