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
import Challenge from '../../components/challenge'

function Challenges() {
const [data, setData] = useState(null)
const router = useRouter()

useEffect(() => {
  fetch('/api/challenges')
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      setData(data)
    })
}, [router])

return (
  <>
    <Seo title='Challenges' />
    <Navbar />
    <main className='mx-auto w-[500px] text-center'>
      <Title content={'Challenges'} />
      {data && data.length === 0 && <p className='mt-3'>No leagues yet!</p>}
      {data && data.map((l, i) => {
        return <Challenge key={i} {...l} onClick={() => {
          router.push(`/challenges/${l._id}`)
        }}/>
      })}
      <div className='flex justify-around text-sm mt-5'>
        <Button
          text = {'New Challenge'}
          onClick = {() => {
            router.push('/challenges/new')
          }}
        />
      </div>
    </main>
  </>
)
}

export default Challenges