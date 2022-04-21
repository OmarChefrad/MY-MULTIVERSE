// import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
// import Image from 'next/image '
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import { motion } from 'framer-motion'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
      className="mx-auto flex min-h-screen max-w-7xl select-none flex-col items-center justify-center px-3 2xl:px-0"
    >
      <Head>
        <title>MY MULTIVERSE</title>
        <link
          rel="icon"
          href="https://res.cloudinary.com/adonis1/image/upload/v1649611094/STOOLED-modified_trohmc.png"
        />
      </Head>
      <header className="items-centre flex justify-between pb-10 lg:pb-20 backdrop-blur-3xl">
        <h1 className="w-full cursor-pointer text-3xl font-extralight sm:w-full lg:text-4xl">
          <span className="font-extrabold  underline decoration-rose-400">
            NFT'S
          </span>{' '}
          MARKET PLACE
        </h1>
      </header>
      <main className="rounded-2xl bg-slate-100 p-5 shadow-xl shadow-rose-300">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map((collection) => (
            <Link href={`/nft/${collection.slug.current}`}>
              <div className="flex cursor-pointer flex-col items-center py-4 transition-all duration-300 hover:scale-105">
                <img
                  className="w-85 h-80 rounded-2xl object-cover shadow-xl shadow-pink-100"
                  src={urlFor(collection.previewImage).url()}
                  alt=""
                />
                <div className="p-1">
                  <h2 className="items-center font-mono text-xl">
                    {collection.NftCollectionName}
                  </h2>
                  <p className="mt-2 text-sm">
                    <span className="font-extrabold underline decoration-rose-800/50">
                      NFT-ID
                    </span>
                    : {collection._id}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </motion.div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
  _id,
  address,
  description,
  NftCollectionName,
  mainImage {
    asset
  },
  previewImage {
    asset
  },
  slug{
    current
  },
  creator->{
    _id,
    name,
    bio,
    address,
   slug{
    current
    },
  },
}`

  const collections = await sanityClient.fetch(query)
  return {
    props: {
      collections,
    },
  }
}
