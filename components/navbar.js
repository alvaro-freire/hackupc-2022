import Link from "next/link"

function Navbar() {
  return (
    <main>
      <nav>
        <Link href='/leagues'>Leagues</Link>
        <Link href='/friends'>Friends</Link>
        <Link href='/profile'>Profile</Link>
      </nav>
    </main>
  )
}

export default Navbar