import Image from "next/image"
import { useState, useEffect } from "react"
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"

function Profile() {

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetch(`/api/me`)
      .then((res) => res.json())
      .then(setProfile)
  }, [])

  return (
    <>
      <Seo title='Home' />
      <Navbar />
      <div className='px-3 text-center mt-16 mb-4 w-[300px] mx-auto'>
        <Image src={'/zombie.png'} width={'100px'} height={'100px'} />
        <div className='text-xl mb-3'>{profile && profile.username}</div>
      </div>
      <div className='flex w-[400px] text-center mx-auto'>
        <div className='my-auto w-[300px] mx-auto'>
          <div>
            <p className='my-2 text-3xl'>{profile && profile.leagues}</p>
          </div>
          <div>
            <p className='my-2 text-sm'>{'leagues'}</p>
          </div>
        </div>
        <div className='my-auto w-[300px] mx-auto'>
          <div>
            <p className='my-2 text-3xl'>{profile && profile.points}</p>
          </div>
          <div>
            <p className='my-2 text-sm'>{'points'}</p>
          </div>
        </div>
        <div className='my-auto w-[300px] mx-auto'>
          <div>
            <p className='my-2 text-3xl'>{profile && profile.results}</p>
          </div>
          <div>
            <p className='my-2 text-sm'>{'uploads'}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile