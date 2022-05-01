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
      <nav className='flex w-[500px] mx-auto justify-around mt-3 mb-5'>
        <Link href='/leagues'>
          <a className={router.pathname.startsWith('/leagues') ? 'underline' : ''}>Leagues</a>
        </Link>
        <Link href='/challenges'>
          <a className={router.pathname.startsWith('/challenges') ? 'underline' : ''}>Challenges</a>
        </Link>
        <Link href='/upload'>
          <a className={router.pathname.startsWith('/upload') ? 'underline' : ''}>Upload</a>
        </Link>
        <Link href='/profile'>
          <a className={router.pathname.startsWith('/profile') ? 'underline' : ''}>Profile</a>
        </Link>
        {username && <p className="cursor-pointer" onClick={handleLogout}>Logout</p>}
      </nav>
    </main>
  )
}

export default Navbar