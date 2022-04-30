import { useRouter } from "next/router"
import Button from "../../components/button"
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"
import TextArea from "../../components/textarea"

function Upload() {
  const router = useRouter()

  async function handleUpload(event) {
    event.preventDefault()
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