import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wordle League</title>
        <meta name="description" content="Wordle League App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">
        Welcome to Wordle League!
      </h1>
    </div>
  )
}
