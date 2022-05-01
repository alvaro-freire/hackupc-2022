import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Alert from '../../components/alert'
import Button from '../../components/button'
import League from '../../components/league'
import Navbar from "../../components/navbar"
import Podium from '../../components/podium'
import Score from '../../components/score'
import Seo from "../../components/seo"
import Title from '../../components/title'

function LeaguePage() {
  const router = useRouter()
  const { id } = router.query
  const [league, setLeague] = useState(null)
  const [scoreboard, setScoreboard] = useState(null)
  const [copied, setCopied] = useState(false)

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
      <div className='text-center w-[400px] mx-auto mb-4'>
        <Title
          content={league && league.name}
        />
      </div>
      {copied &&
        <Alert
          text={'Link copied :)'}
          bgColor='bg-blue-400'
          onClose={() => {
            setCopied(false)
          }}
        />
      }
      <Podium
        first={scoreboard &&
          scoreboard.scoreboard &&
          scoreboard.scoreboard[0] &&
          scoreboard.scoreboard[0].username}
        second={scoreboard &&
          scoreboard.scoreboard &&
          scoreboard.scoreboard[1] &&
          scoreboard.scoreboard[1].username}
        third={scoreboard &&
          scoreboard.scoreboard &&
          scoreboard.scoreboard[2] &&
          scoreboard.scoreboard[2].username}
      />
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
        {scoreboard && scoreboard.scoreboard && scoreboard.scoreboard.map((user, i) => {
          return <Score key={i} {...user} onClick={() => {
            router.push(`/leagues/${l._id}`)
          }} />
        })}
      </div>
      <div className='mt-4 flex justify-center text-center mx-auto w-full'>
        <div>
          <Button
            text={'Leave League'}
            onClick={() => {
              fetch(`/api/leagues/${id}/leave`)
                .then(() => {
                  return router.push('/leagues')
                })
            }}
          />
        </div>
        <div className='w-10'></div>
        <div className=''>
          <Button
            text={'Copy invitation link'}
            onClick={() => {
              setCopied(true)
              navigator.clipboard.writeText(`https://wordleleague.vercel.app/leagues/join?id=${id}`)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default LeaguePage