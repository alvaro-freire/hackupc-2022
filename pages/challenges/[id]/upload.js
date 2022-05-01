import { useRouter } from "next/router"
import Button from "../../../components/button"
import Navbar from "../../../components/navbar"
import Seo from "../../../components/seo"
import TextArea from "../../../components/textarea"
import Title from "../../../components/title"

function Upload() {
  const router = useRouter()

  const { id } = router.query

  async function handleUpload(event) {
    event.preventDefault()

    const data = {
      url: event.target.result.value,
    }

    if (!data.url) return

    const JSONdata = JSON.stringify(data)

    const endpoint = `/api/challenges/${id}/upload`

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    if (response.status === 200) {
      router.push('/challenges')
    }
  }

  return (
    <>
      <Seo title='Upload' />
      <Navbar />
      <Title content={'Upload'} />
      <main>
        <form onSubmit={handleUpload}>
          <TextArea 
            label={'Paste your link here'}
            type={'text'}
            name={'result'}
          />
          <Button
            text = {'Upload challenge'}
          />
        </form>
      </main>
    </>
  )
}

export default Upload