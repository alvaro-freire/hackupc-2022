import { useRouter } from "next/router"
import Button from "../../components/button"
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"
import TextArea from "../../components/textarea"
import Title from "../../components/title"

function Upload() {
  const router = useRouter()

  async function handleUpload(event) {
    event.preventDefault()

    const data = {
      result: event.target.result.value,
    }

    if (!data.result) return

    const JSONdata = JSON.stringify(data)

    const endpoint = '/api/results'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    const { _id } = await response.json()

    if (response.status === 200) {
      router.push(`/results/${_id}`)
    }
  }

  return (
    <>
      <Seo title='Upload' />
      <Navbar />
      <Title 
        content={'Upload'}
      />
      <main>
        <form onSubmit={handleUpload}>
          <TextArea 
            label={'Paste your result here'}
            type={'text'}
            name={'result'}
          />
          <Button
            text = {'Upload result'}
          />
        </form>
      </main>
    </>
  )
}

export default Upload