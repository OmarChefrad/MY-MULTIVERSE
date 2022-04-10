import React, { useEffect, useState } from 'react'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from '@thirdweb-dev/react'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { BigNumber } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'

interface Props {
  collection: Collection
  getServerSideProps: GetServerSideProps
}

function NftDropPage({ collection }: Props) {
  const [claimedSupply, setClaimedSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [loaded, setLoaded] = useState<boolean>(true)
  const [priceeth, setPriceeth] = useState<string>()
  //auth
  const connectWithMetamask = useMetamask()
  const adress = useAddress()
  const disconnect = useDisconnect()
  const nftdrop = useNFTDrop(collection.address)
  //fecth price
  useEffect(() => {
    const fetchPrice = async () => {
      if (!nftdrop) return
      const claimConditions = await nftdrop.claimConditions.getAll()
      setPriceeth(claimConditions?.[0].currencyMetadata.displayValue)
    }
    fetchPrice()
  }, [nftdrop])

  //get Supply
  useEffect(() => {
    if (!nftdrop) return
    setLoaded(true)
    const fetchNftDropData = async () => {
      const claimed = await nftdrop.getAllClaimed()
      const total = await nftdrop.totalSupply()

      setClaimedSupply(claimed.length)
      setTotalSupply(total)

      setLoaded(false)
    }
    fetchNftDropData()
  }, [nftdrop])

  const minNft = () => {
    if (!nftdrop || !adress) return
    const quantity = 1
    setLoaded(true)
    const notifications = toast.loading('Minting NFT 🚀...', {
      style: {
        background: 'white',
        color: 'rose',
        fontWeight: 'bolder',
        fontSize: '17px',
        padding: '20px',
      },
    })
    nftdrop
      .claimTo(adress, quantity)
      .then(async (tx) => {
        const receipt = tx[0].receipt
        const claimedTokenid = tx[0].id
        const claimedNFT = await tx[0].data()

        console.log(receipt)
        console.log(claimedTokenid)
        console.log(claimedNFT)

        toast('Congrats 👏... You minted your NFT', {
          duration: 7000,
          style: {
            background: 'white',
            color: 'rose',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      })
      .catch((err) => {
        console.log(err)
        toast('Whoops 👀... Something went wrong', {
          duration: 10000,
          style: {
            background: 'white',
            color: 'rose',
            fontWeight: 'bolder',
            fontSize: '17px',
            padding: '20px',
          },
        })
      })
      .finally(() => {
        setLoaded(false)
        toast.dismiss(notifications)
      })
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 2,
        },
      }}
      className="flex h-screen select-none flex-col lg:grid lg:grid-cols-10 "
    >
      <Toaster position="bottom-center" />
      {/* Left  */}
      <div className="bg-gradient-to-br from-cyan-700 to-rose-700 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen ">
          <div className="rounded-xl bg-gradient-to-br from-cyan-900 to-rose-900 p-2">
            <img
              className="w-50 lg:w-85 rounded-xl object-cover lg:h-96"
              src={urlFor(collection.previewImage).url()}
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-gray-300">
              {collection.slug.current}
            </h1>
            <h2 className="text-xl  text-gray-200">{collection.description}</h2>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* header */}
        <header className="items-centre flex justify-between">
          <Link href="/">
            <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
              <span className="font-extrabold underline decoration-rose-800/50">
                OMAR'S
              </span>{' '}
              NFT MARKET PLACE
            </h1>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              adress ? disconnect() : connectWithMetamask()
            }}
            className="w-20 rounded-full bg-rose-500 px-4 py-1 text-xs font-bold text-white lg:w-40 lg:px-0 lg:text-base"
          >
            {adress ? 'Sign Out' : 'Sign In'}
          </motion.button>
        </header>
        <hr className="my-2 border bg-rose-400" />
        {adress && (
          <p className="text-center text-sm text-rose-500">
            Your logged in with your wallet {adress.substring(0, 5)}...
            {adress.substring(adress.length - 5)}
          </p>
        )}
        {/* content */}
        <div className="mt-10 flex flex-1 flex-col  items-center space-y-7 rounded-xl text-center lg:justify-center lg:space-y-0 ">
          <img
            className="pd-10 lg:h-90 w-100 rounded-xl object-cover lg:py-20"
            src={urlFor(collection.mainImage).url()}
            alt=""
          />
          <h1 className=" w-90 sm:w-90 font-hairline cursor-pointer py-2 text-xs ">
            <span className="font-bold underline decoration-rose-800/50">
              OMAR'S
            </span>{' '}
            Multiverse is a collection of NFT's Only limited to personal
            non-commercial use and All copyright and other rights are reserved.
          </h1>{' '}
          {loaded ? (
            <p className="animate-pulse pt-2 text-xl text-rose-500">
              Loading Supply ...
            </p>
          ) : (
            <p className="pt-2 text-xl text-rose-500">
              {claimedSupply}/{totalSupply?.toString()} NFT's Claimed
            </p>
          )}
        </div>

        {/* Mint button */}
        <div className="py-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={minNft}
            disabled={
              loaded || claimedSupply === totalSupply?.toNumber() || !adress
            }
            className="w-full rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white disabled:bg-gray-400 lg:text-base"
          >
            {loaded ? (
              <>Loading...</>
            ) : claimedSupply === totalSupply?.toNumber() ? (
              <>Sold Out!!!</>
            ) : !adress ? (
              <>Sign in to Mint</>
            ) : (
              <span className="font-bold">MINT YOUR NFT ({priceeth}) ETH</span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default NftDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current == $id][0]{
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

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  })
  if (!collection) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      collection,
    },
  }
}
