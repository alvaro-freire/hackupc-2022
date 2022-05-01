import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Button from "../../../components/button"
import Navbar from "../../../components/navbar"
import Seo from "../../../components/seo"
import Title from "../../../components/title"

function Challenge() {
  const router = useRouter()
  const { id } = router.query

  const [challenge, setChallenge] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    fetch(`/api/challenges/${id}`)
      .then(res => res.json())
      .then(setChallenge)
    fetch(`/api/me`)
      .then(res => res.json())
      .then(res => setUsername(res.username))
  }, [id, setChallenge, setUsername])

  return (
    <>
      <Seo title='Upload' />
      <Navbar />
      <Title content={challenge && challenge.nextStep ? 'Ongoing challenge' : 'Finished challenge'} />
      {challenge &&
        <div className='w-[400px] mx-auto text-center flex justify-around mt-5'>
          <div>
            <Image alt={'zombie'} src={'/zombie.png'} width={'100px'} height={'100px'} />
            <p>{challenge.from}</p>
            <p className={'text-sm'}>{challenge.from === username ? challenge.myPoints : challenge.rivalPoints}</p>
          </div>
          <div>
            <Image alt={'zombie'} src={'/zombie.png'} width={'100px'} height={'100px'} />
            <p>{challenge.to}</p>
            <p className={'text-sm'}>{challenge.to === username ? challenge.myPoints : challenge.rivalPoints}</p>
          </div>
        </div>
      }
      {challenge && challenge.nextStep && challenge.nextStep.user === username && (challenge.nextStep.step === 'upload' ?
        <div className='w-[400px] mx-auto text-center mt-3'>
          <Button 
            text={'Upload'}
            onClick={() => {
              router.push(`/challenges/${id}/upload`)
            }}
          />
        </div> :
        <div className='w-[400px] mx-auto text-center mt-3'>
        <Button 
          text={'Solve'}
          onClick={() => {
            router.push(`/challenges/${id}/solve`)
          }}
        />
      </div>
      )}
    </>
  )
}

export default Challenge