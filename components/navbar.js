import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

function Navbar() {
  const router = useRouter()
  const [username, setUsername] = useState(null)

  useEffect(() => {
    if (router.pathname === '/login') return
    fetch('/api/me')
      .then((res) => {
        if (res.status !== 200) return router.push('login')
        return res.json()
      }).then(setUsername)
  }, [router])

  async function handleLogout() {
    await fetch('/api/logout')
    router.push('/login')
  }

  return (
    <main>
      <nav className='underline flex w-[400px] mx-auto justify-around mt-3 mb-5'>
        <Link href='/leagues'>Leagues</Link>
        <Link href='/friends'>Friends</Link>
        <Link href='/profile'>Profile</Link>
        {!username && <Link href='/login'>Login</Link> }
        {username && <p className="cursor-pointer" onClick={handleLogout}>Logout</p>}
      </nav>
    </main>
  )
}

export default Navbar