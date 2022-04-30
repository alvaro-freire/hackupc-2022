import { useState, useEffect } from "react"
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"
import Title from "../../components/title"

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
        <div className='my-auto text-center mt-6 w-[300px] mx-auto'>
          <Title
              content={'Profile'}
          />
        </div>
        <div className='my-auto text-center mt-6 w-[300px] mx-auto border'>
          <p className='my-2'>Username: {profile && profile.username}</p>
        </div>
        <div className='my-auto text-center mt-2 w-[300px] mx-auto border'>
          <p className='my-2'>Nº leagues: {profile && profile.leagues}</p>
        </div>
        <div className='my-auto text-center mt-2 w-[300px] mx-auto border'>
          <p className='my-2'>Total uploads: {profile && profile.results}</p>
        </div>
        <div className='my-auto text-center mt-2 w-[300px] mx-auto border'>
          <p className='my-2'>Total points: {profile && profile.points}</p>
        </div>
    </>
  )
}

export default Profile