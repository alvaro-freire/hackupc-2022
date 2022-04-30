import { useRouter } from "next/router"
import Button from "../../components/button"
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"
import TextArea from "../../components/textarea"

function Upload() {
  const router = useRouter()

  async function handleUpload(event) {
    event.preventDefault()

    const data = {
      result: event.target.result.value,
    }

    if (!data) return

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

    if (response.status === 200) {
      router.push('/leagues')
    }
  }

  return (
    <>
      <Seo title='Upload' />
      <Navbar />
      <main>
        <form onSubmit={handleUpload}>
          <TextArea 
            label={'Result'}
            subLabel={'Paste your result here'}
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