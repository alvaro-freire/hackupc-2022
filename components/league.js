import { useEffect, useState } from "react"

function League({ _id, name, typeUrl, onClick }) {

  const [scoreboard, setScoreboard] = useState()

  useEffect(() => {
    fetch(`/api/leagues/${_id}/scoreboard`)
    .then((res) => res.json())
    .then(setScoreboard)
  }, [_id])

  return (
    <div className='flex border border-black mt-3 cursor-pointer' onClick={onClick}>
      <div className='text-left p-2 grow'>
        <p className='text-lg'>{name}</p>
        <p className='text-sm text-grey-500'>{typeUrl}</p>
      </div>
      <div className='my-auto p-1 mr-1'>
      {scoreboard && scoreboard.position === 1 && <span className="text-xl">🥇</span>}
      {scoreboard && scoreboard.position === 2 && <span className="text-xl">🥈</span>}
      {scoreboard && scoreboard.position === 3 && <span className="text-xl">🥉</span>}
      </div>
      <div className='my-auto p-1 mr-1 w-[80px]'>
        <div>{scoreboard && <p>#{scoreboard.position} of {scoreboard.scoreboard.length}</p>}</div>
        <div className="text-sm text-gray-500">{scoreboard && scoreboard.scoreboard && scoreboard.scoreboard[scoreboard.position - 1].points} pts.</div>
      </div>
    </div>
  )
}
  
export default League