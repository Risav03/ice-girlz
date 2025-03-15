'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Button from '../UI/items/button'
import { contractAdds } from '@/utils/contractAdds'
import igAbi from "@/utils/abis/ice-girlz"
import ifAbi from "@/utils/abis/ice-folks"
import { NFTHolder } from './nftHolder'

const collectionData = {
    "ice-girlz": {
        name: 'Ice Girlz',
        ca: contractAdds.iceGirlz,
        abi: igAbi,
        index: 1,
        rewards: 10
    },
    "ice-folks": {
        name: 'Ice Folks',
        ca: contractAdds.iceFolks,
        abi: ifAbi,
        index: 2,
        rewards: 15
    }
} as const

type CollectionKey = keyof typeof collectionData

export const StakeHolder = ({collection}: {collection: CollectionKey}) => {

    const router = useRouter();


    return (
        <div className="min-h-screen h-screen w-screen md:px-10 max-md:px-4 pt-24 pb-12 flex items-center justify-center">
            <div className='w-[70vw] md:min-w-[700px] max-md:w-full md:h-[70vh] h-[85vh]'>
                <div className='w-full max-md:py-4 max-md:gap-2 md:h-20 max-md:flex-col bg-white rounded-2xl border-[1px] items-center px-6 border-icePurp flex'>
                    <h1 className='text-icePurp text-3xl max-md:hidden font-bold text-left md:w-1/2'>
                        STAKING
                    </h1>
                    <div className='flex gap-2 max-md:justify-center md:justify-end md:w-1/2'>
                        <Button onClick={()=>{router.push("/collection/ice-girlz")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>ICE GIRLZ</Button>
                        <Button onClick={()=>{router.push("/collection/ice-folks")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>ICE FOLKS</Button>
                        {/* <Button onClick={()=>{router.push("/collection/wicc")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>WICC</Button> */}
                    </div>
                </div>

                <div className='w-full mt-4 md:h-[calc(70vh-5rem)] h-[calc(85vh-5rem)] overflow-hidden bg-white rounded-2xl border-[1px] items-center border-icePurp flex'>
                    <NFTHolder info={collectionData[collection]} />
                </div>
            </div>
        </div>
    )
}