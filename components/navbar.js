import Link from "next/link"

function Navbar() {
  return (
    <main>
      <nav className='underline flex w-[400px] mx-auto justify-around mt-3 mb-5'>
        <Link href='/leagues'>Leagues</Link>
        <Link href='/friends'>Friends</Link>
        <Link href='/profile'>Profile</Link>
        <Link href='/login'>Login</Link>
      </nav>
    </main>
  )
}

export default Navbar