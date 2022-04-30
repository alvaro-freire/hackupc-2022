import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"

function LeaguePage() {
  const router = useRouter()
  const { id } = router.query

  const [league, setLeague] = useState(null)

  useEffect(() => {
    fetch(`/api/leagues/${id}`)
      .then((res) => {
        if (res.status !== 200) return router.push('/leagues')
        return res.json()
      }).then(setLeague)
  }, [router])

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
            {id}
          </div>
        </div>
        <div className='text-center w-[400px] mx-auto mt-5 underline'>
          Scoreboard
        </div>
      </main>
    </>
  )
}

export default LeaguePage