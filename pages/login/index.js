import { useRouter } from "next/router"
import Button from "../../components/button"
import Input from "../../components/input"
import Navbar from "../../components/navbar"
import Seo from "../../components/seo"

function Login() {
  const router = useRouter()
  
  async function handleSubmit(event) {
    event.preventDefault()

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    if (!data.username || !data.password) {
      return
    }

    const JSONdata = JSON.stringify(data)

    const endpoint = '/api/login'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)

    if (response.status === 200) {
      router.push('leagues')
    }
  }
  
  return (
    <>
      <Seo title='Login' />
      <Navbar />
      <main>
        <h2 className='mx-auto w-[250px] text-center font-bold my-4'>Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            label='Username'
            name='username'
          />
          <Input
            type='password'
            label='Password'
            name='password'
          />
          <Button />
        </form>
      </main>
    </>
  )
}

export default Login