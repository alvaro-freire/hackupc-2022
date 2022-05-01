import { useEffect, useState } from "react"

function Challenge({ _id, onClick }) {
  
  const [challenge, setChallenge] = useState(null)

  useEffect(() => {
    fetch(`/api/challenges/${_id}`)
      .then((res) => res.json())
      .then(setChallenge)
  }, [_id])
  
  return (
    <div className='border p-2 border-black mt-3 cursor-pointer' onClick={onClick}>
      <div className='text-left grow p-2 h-8'>
        <p className='text-lg align-top'>Turn: {challenge && challenge.to}</p>
      </div>
      <div className='text-right p-3 grow h-16'>
        <p className='text-2xl align-top'>{challenge && challenge.rivalPoints - challenge.myPoints } pts</p>
      </div>
      <div className='flex p-2'>
        <div>
          <p className='text-lg'>Best of: {challenge && challenge.bestOf}</p>
        </div>
        <div className='w-[200px] text-right text-lg'>
          <p>Rounds: ✅⬜⬜ {challenge && challenge.round}</p>
        </div>
      </div>
    </div>
  )
}
  
export default Challenge