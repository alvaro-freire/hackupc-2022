import Image from 'next/image'
import Navbar from '../components/navbar'
import Seo from '../components/seo'

export default function Home() {
  return (
    <div>
      <Seo title='Home' />
      <Navbar />
      <div className='mx-auto mt-20 text-center'>
        <Image alt='trophy' src={'/apple-touch-icon.png'} width='60px' height={'60px'} />
      </div>
      <h1 className="text-2xl text-center mt-3 w-[200px] mx-auto font-bold">
        Welcome to Wordle League!
      </h1>
      <h2 className='text-center mt-3 w-full mx-auto'>Start sharing results with your friends now!</h2>
    </div>
  )
}
