import { useRouter } from "next/router"
import { useState } from "react"
import Button from "../../components/button"
import Input from "../../components/input"
import Navbar from "../../components/navbar"
import Select from "../../components/select"
import Seo from "../../components/seo"
import Title from "../../components/title"

function New() {
  const router = useRouter()
  const [bestof, setBestof] = useState(1)

  async function handleSubmit(event) {
    event.preventDefault()

    const data = {
      to: event.target.to.value,
      bestof: event.target.bestof.value,
      url: event.target.url.value,
    }

    if (!data.to || !data.bestof || !data.url) return

    const JSONdata = JSON.stringify(data)

    const endpoint = '/api/challenges'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const challenge = await response.json()

    if (response.status === 200) {
      router.push(`/challenges/${challenge._id}`)
    }
  }

  return (
    <>
      <Seo title='New Challenge' />
      <Navbar />
      <Title
          content={'New Challenge'}
      />
      <main>
        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            label='Username'
            name='name'
          />
          <Input
            type='text'
            label='Url'
            name='url'
          />
          <Select
            bestof={bestof}
            setBestof={setBestof}
          />
          <Button
            text={'Start Challenge!'}
          />
        </form>
      </main>
    </>
  )
}
  
export default New