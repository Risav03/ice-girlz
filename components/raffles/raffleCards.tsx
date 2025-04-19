import Image from 'next/image'
import React from 'react'

export const RaffleCards = ({contractAdd, tokenId}:{contractAdd:string, tokenId:string}) => {
  console.log(`https://icegirlz.s3.ap-south-1.amazonaws.com/raffles/${contractAdd}-${tokenId}`)
    return (
    <div>
        <Image alt='wow' height={1080} width={1080} src={`https://icegirlz.s3.ap-south-1.amazonaws.com/raffles/${contractAdd}-${tokenId}`} />
    </div>
  )
}
