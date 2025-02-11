import React from 'react'
import Image from 'next/image'

export const NotStakedCard = ({ data }: { data: any }) => {
  return (
    <div className="rounded-md border-[1px] border-icePurp w-fit overflow-hidden hover:-translate-y-1 duration-200 hover:shadow-xl bg-white">
      <Image src={`https://azure-able-wasp-305.mypinata.cloud/ipfs/${data.image.slice(7)}`} width={1080} height={1080} alt={data.name} className="w-40 px-2 pt-2 h-40 rounded-xl" />
      <h2 className="text-icePurp text-center font-bold py-1">{data.name}</h2>
    </div>
  )
}
