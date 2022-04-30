import { useRouter } from "next/router"
import Button from "../../components/button"
import Input from "../../components/input"
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"

function New() {
  const router = useRouter()

  async function handleSubmit(event) {
    event.preventDefault()

    const data = {
      name: event.target.name.value,
      typeUrl: event.target.url.value,
      key: event.target.key.value,
    }

    if (!data.name || !data.typeUrl || !data.key) {
      return
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = '/api/leagues'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const league = await response.json()

    if (response.status === 200) {
      router.push(`/leagues/${league._id}`)
    }
  }

  return (
    <>
      <Seo title='New' />
      <Navbar />
      <main>
        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            label='League Name'
            name='name'
          />
          <Input
            type='text'
            label='Url'
            name='url'
          />
          <Input
            type='password'
            label='Key'
            name='key'
          />
          <Button
            text = {'Create League'}
          />
        </form>
      </main>
    </>
  )
}
  
export default New