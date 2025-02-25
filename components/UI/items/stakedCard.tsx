import Image from 'next/image'
import React from 'react'

export const StakedCard = ({data, handleClaim}:{data:any, handleClaim:any}) => {
  return (
    <div className='p-1'>
    <div className="rounded-md border-[1px] border-icePurp w-fit overflow-hidden hover:-translate-y-1 duration-200 hover:shadow-xl bg-white">
      <Image src={`https://azure-able-wasp-305.mypinata.cloud/ipfs/${data.image.slice(7)}`} width={1080} height={1080} alt={data.name} className="w-full px-2 pt-2 h-full aspect-square rounded-xl" />
      <h2 className="text-icePurp text-center font-bold py-1">{data.name}</h2>

      <button onClick={handleClaim} className="bg-icePurp/40 text-xs flex border-t-[1px] border-icePurp hover:bg-icePurp duration-200 text-black hover:text-white font-bold w-full py-2">
        <div className='w-1/3'>
          Claim
        </div>
        <div className='w-2/3 text-right pr-2'>
          {Number(data.rewards).toFixed(2)} $FROST
        </div>
      </button>
    </div>

    </div>
  )
}
