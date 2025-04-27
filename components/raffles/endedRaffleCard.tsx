import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const EndedRaffleCard = ({values}:{values:any}) => {

    console.log(values)

  return (
    <div className='border-2 border-icePurp rounded-lg p-2 w-48 flex gap-2 text-icePurp bg-white'>
        <Image alt='wow' height={1080} width={1080} src={`https://icegirlz.s3.ap-south-1.amazonaws.com/raffles/${values.contractAddress?.toLowerCase()}-${values?.tokenId}`} className='object-cover border-[1px] border-icePurp w-12 aspect-square rounded-md' />
        <div className='text-icePurp'>
            <h2 className='text-icePurp text-sm font-bold leading-tight'>{values.name} #{values.tokenId}</h2>
            <Link className='text-icePurp text-xs hover:underline leading-tight my-0' href={`https://polygonscan.com/address/${values.winner}`} target='blank' >Winner: {values.winner.slice(0,4)}...{values.winner.slice(-4,values.winner.length)}</Link>
        </div>
    </div>
  )
}
