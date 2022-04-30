import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Button from "../../components/button"
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"
import Title from "../../components/title"

function Result() {
  const router = useRouter()
  const { id } = router.query

  const [result, setResult] = useState()

  useEffect(() => {
    fetch(`/api/results/${id}`)
      .then(res => res.json())
      .then(setResult)
  })

  async function handleSubmit(event) {
    event.preventDefault()
    router.push('/leagues')
  }

  return (
    <>
      <Seo title='Result' />
      <Navbar />
      <Title content={'Your Result'} />
      <div className='w-full text-center mx-auto mt-2'>
        <p>{result && result.head}</p>
        <p className='my-3'>{result && result.emojis && result.emojis.map((e) => {
          return <p>{e}</p>
        })}</p>
        {result && result.typeUrl &&
          <Link href={result.typeUrl}>
            <a className='text-blue-500' target='_blank'>{result.typeUrl}</a>
          </Link>
        }
      </div>
      <div className='w-[300px] text-center text-lg mx-auto mt-3'>
        <p>You got {result && result.points} points!</p>
      </div>
      <form className='mt-3' onSubmit={handleSubmit}>
        <Button
          text={'Perfecto chulo'}
        />
      </form>
    </>

  )
}

export default Result