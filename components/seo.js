import Head from "next/head"

function Seo({title}) {
  return (
    <Head>
      <title>Wordle League | {title || 'Default'}</title>
      <meta name="description" content="Wordle League App" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    </Head>
  )
}

export default Seo