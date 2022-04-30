import { 
    useState,
    useEffect
} from 'react'
import { useRouter } from "next/router"
import League from '../../components/league'
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"

function Leagues() {
  const [data, setData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetch('api/leagues')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  if (!data || data.length === 0) return <p>No leagues</p>

  return (
    <>
      <Seo title='Leagues' />
      <Navbar />
      <main className='mx-auto w-[250px] text-center'>
        <h2 className='font-bold'>Leagues</h2>
        {data.map(l => {
            return <League {...l} onClick={() => {
                router.push('leagues/{l._id}')
            }}/>
        })}
      </main>
    </>
  )
}

export default Leagues