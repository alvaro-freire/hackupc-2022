import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import League from '../../components/league'
import Navbar from "../../components/navbar"
import Score from '../../components/score'
import Seo from "../../components/seo"

function LeaguePage() {
  const router = useRouter()
  const { id } = router.query
  const [league, setLeague] = useState(null)
  const [scoreboard, setScoreboard] = useState(null)

  useEffect(() => {
    fetch(`/api/leagues/${id}`)
      .then((res) => {
        if (res.status !== 200) return router.push('/leagues')
        return res.json()
      }).then(setLeague)

    fetch(`/api/leagues/${id}/scoreboard`)
      .then((res) => {
        return res.json()
      }).then(setScoreboard)
  }, [router, id])

  return (
    <>
      <Seo title='Leagues' />
      <Navbar />
      <main>
        <div className='text-center w-[400px] mx-auto'>
          <div className='text-lg font-bold mt-10'>
            {league && league.name}
          </div>
          <div className='text-sm mt-3'>
            <p>League ID: {id}</p>
          </div>
        </div>
        <div className='text-center w-[400px] mx-auto mt-5 p-2'>
          <div className='flex border-b border-black font-bold'>
            <div className='text-center p-2 w-[50px]'>
              <p>{'Pos'}</p>
            </div>
            <div className='text-left pl-10 my-auto p-1 grow'>
              <p>{'Username'}</p>
            </div>
            <div className='text-center p-2 w-[70px]'>
              <p>Uploads</p>
            </div>
            <div className='text-center p-2 w-[70px]'>
              <p>Points</p>
            </div>
          </div>
          {scoreboard && scoreboard.scoreboard.map((user, i) => {
            return <Score key={i} {...user} onClick={() => {
              router.push(`/leagues/${l._id}`)
            }} />
          })}
        </div>
      </main>
    </>
  )
}

export default LeaguePage