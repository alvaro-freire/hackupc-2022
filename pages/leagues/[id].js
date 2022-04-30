import { useRouter } from 'next/router'
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"

function LeaguePage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <Seo title='Leagues' />
      <Navbar />
      <main>
        <h2>{id}</h2>
      </main>
    </>
  )
}

export default LeaguePage