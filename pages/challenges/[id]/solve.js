import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Button from "../../../components/button"
import Navbar from "../../../components/navbar"
import Seo from "../../../components/seo"
import TextArea from "../../../components/textarea"
import Title from "../../../components/title"

function Solve() {
  const router = useRouter()
  const { id } = router.query

  const [challenge, setChallenge] = useState(null)

  useEffect(() => {
    fetch(`/api/challenges/${id}`)
      .then(res => res.json())
      .then(setChallenge)
  }, [id, setChallenge])

  async function handleUpload(event) {
    event.preventDefault()

    const data = {
      result: event.target.result.value,
    }

    if (!data.result) return

    const JSONdata = JSON.stringify(data)

    const endpoint = `/api/challenges/${id}/solve`

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
      router.push('/challenges')
    }
  }

  return (
    <>
      <Seo title='Solve' />
      <Navbar />
      <Title content={'Solve'} />
      <main>
        <div className='mt-4 w-[500px] mx-auto text-center'>
          <p>Link: </p>{challenge && 
          <Link href={challenge.nextStep && challenge.nextStep.url}>
            <a className='text-blue-500' target='_blank'>{'Click aquí'}</a>
          </Link>
          }
        </div>
        <form onSubmit={handleUpload}>
          <TextArea
            label={'Paste your result here'}
            type={'text'}
            name={'result'}
          />
          <Button
            text={'Respond challenge'}
          />
        </form>
      </main>
    </>
  )
}

export default Solve