import { 
    useState,
    useEffect
} from 'react'
import { useRouter } from "next/router"
import League from '../../components/league'
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"
import Button from '../../components/button'

function Leagues() {
  const [data, setData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/leagues')
      .then((res) => {
        if (res.status !== 200) return router.push('login')
        return res.json()
      })
      .then((data) => {
        setData(data)
      })
  }, [router])

  return (
    <>
      <Seo title='Leagues' />
      <Navbar />
      <main className='mx-auto w-[250px] text-center'>
        <h2 className='font-bold'>Leagues</h2>
        {data && data.map((l, i) => {
            return <League key={i} {...l} onClick={() => {
              router.push(`/leagues/${l._id}`)
            }}/>
        })}
        <div className='flex justify-around text-sm'>
          <Button
            text = {'Join League'}
            onClick = {() => {
              router.push('/leagues/join')
            }}
          />
          <div>
          <Button
            text = {'Create League'}
            onClick = {() => {
              router.push('/leagues/new')
            }}
          />
          </div>
        </div>
      </main>
    </>
  )
}

export default Leagues