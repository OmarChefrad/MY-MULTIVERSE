import React from 'react'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'

function NftDropPage() {
  //auth
  const connectWithMetamask = useMetamask()
  const adress = useAddress()
  const disconnect = useDisconnect()

  console.log(adress)

  return (
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10  ">
      {/* Left  */}
      <div className="bg-gradient-to-br from-cyan-700 to-rose-700 lg:col-span-4">
        <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen ">
          <div className="rounded-xl bg-gradient-to-br from-cyan-900 to-rose-900 p-2">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72"
              src="https://lh3.googleusercontent.com/zFvIdh-DTK1ZwlPgyrGm1Wm_2wcw5_SchSPcT40sqvAv67VvO5SwCruvVYkjhnLA0b07bDNbmWnKPJfE2NhqOhEBRGhh4D3mhzj_HQ=w600"
              alt=""
            />
          </div>
          <div className="space-y-2 p-5 text-center">
            <h1 className="text-4xl font-bold text-gray-300">
              OMAR'S MULTIVERSE
            </h1>
            <h2 className="text-xl  text-gray-200">
              THIS WEBSITE REPRESENT ALL MY VARIANTS AROUND HYPERSPACES
            </h2>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-1 flex-col p-12 lg:col-span-6">
        {/* header */}
        <header className="items-centre flex justify-between">
          <h1 className="w-52 cursor-pointer text-xl font-extralight sm:w-80">
            <span className="font-extrabold underline decoration-rose-800/50">
              OMAR'S
            </span>{' '}
            NFT MARKET PLACE
          </h1>
          <button
            onClick={() => {
              adress ? disconnect() : connectWithMetamask()
            }}
            className="rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white lg:text-base"
          >
            {adress ? 'Sign Out' : 'Sign In'}
          </button>
        </header>
        <hr className="my-2 border bg-rose-800/50" />
        {adress && <p className="text-center text-sm text-rose-500">Your logged in with your wallet {adress.substring(0, 5)}...{adress.substring(adress.length-5)}</p>}
        {/* content */}
        <div className="mt-10 flex flex-1 flex-col items-center space-y-4 text-center lg:justify-center lg:space-y-0 ">
          <img
            className="pd-10  lg:h-90 w-80 object-cover"
            src="https://sothebys-com.brightspotcdn.com/dims4/default/b143f18/2147483647/strip/true/crop/1200x1950+0+0/resize/684x1112!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2F32%2F40%2Fe1f9215c4df4aa25b2260b4a4754%2Fpunk-it-collage-1.png"
            alt=""
          />
          <h1 className=" w-100 sm:w-100 font-hairline cursor-pointer py-2 text-xs ">
            <span className="font-bold underline decoration-rose-800/50">
              OMAR'S
            </span>{' '}
            Multiverse is a collection of NFT's Only limited to personal
            non-commercial use and All copyright and other rights are reserved
            and not granted.
          </h1>
        </div>
        {/* Mint button */}
        <div className="py-4">
          <button className="w-full rounded-full bg-rose-500 px-4 py-2 text-xs font-bold text-white lg:text-base">
            MINT YOUR NFT
          </button>
        </div>
      </div>
    </div>
  )
}

export default NftDropPage
