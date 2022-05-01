import { useEffect, useState } from "react"

function Challenge({ _id, onClick }) {
  
  const [challenge, setChallenge] = useState(null)

  useEffect(() => {
    fetch(`/api/challenges/${_id}`)
      .then((res) => res.json())
      .then(setChallenge)
  }, [_id])

  const diffPoints = challenge && challenge.rivalPoints - challenge.myPoints
  const diffEmoji = diffPoints > 0 ? '😁' : diffPoints === 0 ? '😑' : '😔'

  return (
    <div className='border px-2 border-black mt-3 cursor-pointer' onClick={onClick}>
      <div className='flex text-left w-[100px] grow p-2 h-6'>
        <p className='text-lg'>{challenge && challenge.to}</p>
        <p className='text-sm mt-1 ml-7 underline'>{challenge && !challenge.nextStep ? ' done' : ''}</p>
      </div>
      <div className='text-right px-3 grow h-10'>
        <p className='text-2xl'>{diffEmoji + ' '}{diffPoints} pts</p>
      </div>
      <div className='flex px-2'>
        <div>
          <p className=''>Best of: {challenge && challenge.bestOf}</p>
        </div>
        <div className='w-[180px] mb-1 text-right text-lg'>
          <p>{challenge && (challenge.nextStep ? '✅'.repeat(challenge.round - 1) : '✅'.repeat(challenge.round))}{challenge && (challenge.nextStep ? '⬜'.repeat(challenge.bestOf - challenge.round + 1) : '⬜'.repeat(challenge.bestOf - challenge.round))}</p>
        </div>
      </div>
    </div>
  )
}
  
export default Challenge