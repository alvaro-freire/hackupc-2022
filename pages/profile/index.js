import Navbar from "../../components/navbar"
import Seo from "../../components/seo"
import Title from "../../components/title"

function Profile() {
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
          <p className='my-2'>Username: Alvaro</p>
        </div>
        <div className='my-auto text-center mt-2 w-[300px] mx-auto border'>
          <p className='my-2'>Nº leagues: 3</p>
        </div>
        <div className='my-auto text-center mt-2 w-[300px] mx-auto border'>
          <p className='my-2'>Total uploads: 17</p>
        </div>
        <div className='my-auto text-center mt-2 w-[300px] mx-auto border'>
          <p className='my-2'>Total points: 12550</p>
        </div>
    </>
  )
}

export default Profile