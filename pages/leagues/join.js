import { useRouter } from "next/router"
import { useState } from "react"
import Alert from "../../components/alert"
import Button from "../../components/button"
import Input from "../../components/input"
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"
import Title from "../../components/title"

function Join() {
  const router = useRouter()

  const [error, setError] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const data = {
      id: event.target.id.value,
      key: event.target.key.value,
    }

    if (!data.id || !data.key) {
      return
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = `/api/leagues/${data.id}/join`

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    if (response.status === 200) {
      router.push(`/leagues/${data.id}`)
    }

    if (response.status === 403) {
      setError(true)
    }
  }

  return (
    <>
      <Seo title='Join League' />
      <Navbar />
      <Title content={'Join League'} />
      <div className='mb-3'></div>
      {error &&
        <Alert
          text={'Wrong Key'}
          onClose={() => {
            setError(false)
          }}
        />
      }
      <main>
        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            label='League Id'
            name='id'
          />
          <Input
            type='password'
            label='Key'
            name='key'
          />
          <Button
            text={'Join League'}
          />
        </form>
      </main>
    </>
  )
}

export default Join