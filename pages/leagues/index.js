import { 
    useState,
    useEffect
} from 'react'
import { useRouter } from "next/router"
import League from '../../components/league'
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"
import Button from '../../components/button'
import Title from '../../components/title'

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
      <main className='mx-auto w-[300px] text-center'>
        <Title
          content={'Leagues'}
        />
        {data && data.length === 0 && <p className='mt-3'>No leagues yet!</p>}
        {data && data.map((l, i) => {
          return <League key={i} {...l} onClick={() => {
            router.push(`/leagues/${l._id}`)
          }}/>
        })}
        <div className='flex justify-around text-sm mt-5'>
          <Button
            text = {'Join League'}
            onClick = {() => {
              router.push('/leagues/join')
            }}
          />
          <Button
            text = {'Create League'}
            onClick = {() => {
              router.push('/leagues/new')
            }}
          />
        </div>
      </main>
    </>
  )
}

export default Leagues