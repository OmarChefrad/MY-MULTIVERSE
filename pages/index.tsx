import type { NextPage } from 'next'
import Head from 'next/head'
import NftDropPage from '../pages/nft/[id]'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col  items-center justify-center ">
      <Head>
        <title>MY MULTIVERSE</title>
        <link
          rel="icon"
          href="https://lh3.googleusercontent.com/zFvIdh-DTK1ZwlPgyrGm1Wm_2wcw5_SchSPcT40sqvAv67VvO5SwCruvVYkjhnLA0b07bDNbmWnKPJfE2NhqOhEBRGhh4D3mhzj_HQ=w600"
        />
      </Head>
      <NftDropPage></NftDropPage>
      <main></main>

      <footer></footer>
    </div>
  )
}

export default Home
