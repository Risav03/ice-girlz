import React from 'react'
import Image from 'next/image'

export const NotStakedCard = ({data}:{data:any}) => {
  return (
    <div className='p-2'>
        <Image alt={data.name} src={data.image} width={200} height={200} />
        <h2>{data.name}</h2>
    </div>
  )
}
