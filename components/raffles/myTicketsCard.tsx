import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const MyTicketsCard = ({values}:{values:any}) => {

  return (
    <div className='border-2 border-icePurp rounded-lg p-2 w-48 flex gap-2 text-icePurp bg-white'>
        <Image alt='wow' height={1080} width={1080} src={`https://icegirlz.s3.ap-south-1.amazonaws.com/raffles/${values.contractAddress?.toLowerCase()}-${values?.tokenId}`} className='object-cover border-[1px] border-icePurp w-12 aspect-square rounded-md' />
        <div className='text-icePurp'>
            <h2 className='text-icePurp text-sm font-bold w-28 truncate leading-tight'>{values.name} #{values.tokenId}</h2>
            <h3 className='text-icePurp text-xs leading-tight my-0'>Holding: {values.tickets}</h3>
        </div>
    </div>
  )
}
