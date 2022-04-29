import Navbar from '../components/navbar'
import Seo from '../components/seo'

export default function Home() {
  return (
    <div>
      <Seo title='Home' />
      <Navbar />
      <h1 className="text-2xl font-bold">
        Welcome to Wordle League!
      </h1>
    </div>
  )
}
