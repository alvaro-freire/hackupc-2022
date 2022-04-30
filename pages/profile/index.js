import Navbar from "../../components/navbar"
import Seo from "../../components/seo"

function Profile() {
  return (
    <>
      <Seo title='Home' />
      <Navbar />
        <div className='my-auto text-center mt-6 w-[300px] mx-auto'>
          <p className='font-bold text-lg'>PERFIL</p>
        </div>
        <div className='my-auto text-center mt-6 w-[300px] mx-auto border'>
          <p className='my-2'>Username: Alvaro</p>
        </div>
        <div className='my-auto text-center mt-2 w-[300px] mx-auto border'>
          <p className='my-2'>Nº ligas: 3</p>
        </div>
        <div className='my-auto text-center mt-2 w-[300px] mx-auto border'>
          <p className='my-2'>Entregas totales: 17</p>
        </div>
        <div className='my-auto text-center mt-2 w-[300px] mx-auto border'>
          <p className='my-2'>Puntos totales: 12550</p>
        </div>
    </>
  )
}

export default Profile