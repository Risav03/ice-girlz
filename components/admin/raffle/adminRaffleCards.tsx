import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

export const AdminRaffleCards = ({values}:{values:any}) => {
    console.log(values)
  return (
    <div className='flex relative w-60 flex-col items-center rounded-xl p-1 justify-center border-2 border-icePurp border-dashed gap-4 '>
      <div className='w-52 aspect-square object-cover  p-2 rounded-xl'>
        <Image alt='wow' height={1080} width={1080} src={`https://icegirlz.s3.ap-south-1.amazonaws.com/raffles/${values.contractAdd}-${values.tokenId}`} />
      </div>
      <div className='p-4'>
        <div className='flex items-center gap-4'>
          <h2 className='text-icePurp text-xl font-bold'>{values.name} #{values.tokenId}</h2>
          <Link className='text-icePurp text-lg hover:scale-105 duration-200' href={values.opensea} target='blank' ><FaExternalLinkAlt/></Link>
        </div>
        <div className='flex-col gap-1'>
          <div className='p-1 mt-2 text-nowrap border-[1px] text-sm flex items-center justify-center text-icePurp font-black border-icePurp rounded-full'>
            Ends on: {new Date(values.endTime*1000).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </div>
          <div className='p-1 mt-2 text-nowrap border-[1px] text-sm flex items-center justify-center text-icePurp font-black border-icePurp rounded-full'>
            Total Holders: {values.holders.length}
          </div>
        </div>

        <div className='flex gap-1 w-full items-center justify-center mt-4'>
            <button className='text-white bg-icePurp px-4 py-1 rounded-full font-bold hover:-translate-y-1 duration-200'>Winner</button>
            <button className='text-red-500 px-4 py-1 rounded-full font-bold hover:-translate-y-1 duration-200'>Delete</button>
        </div>

      </div>
    </div>
  )
}
