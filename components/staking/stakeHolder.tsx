'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Button from '../UI/items/button'
import { contractAdds } from '@/utils/contractAdds'
import igAbi from "@/utils/abis/ice-girlz"
import ifAbi from "@/utils/abis/ice-folks"
import { NFTHolder } from './nftHolder'
import { holdersGetter } from '@/utils/services/getHolders'

const collectionData = {
    "ice-girlz": {
        name: 'Ice Girlz',
        ca: contractAdds.iceGirlz,
        abi: igAbi,
        index: 1
    },
    "ice-folks": {
        name: 'Ice Folks',
        ca: contractAdds.iceFolks,
        abi: ifAbi,
        index: 2
    }
} as const

type CollectionKey = keyof typeof collectionData

export const StakeHolder = ({collection}: {collection: CollectionKey}) => {

    const router = useRouter();


useEffect(()=>{
    holdersGetter()
},[])

    return (
        <div className="min-h-screen w-screen md:px-10 max-md:px-4 py-20 flex items-center justify-center">
            <div className='w-[70vw] min-w-[700px max-md:w-full h-[70vh]'>
                <div className='w-full max-md:py-4 max-md:gap-2 md:h-20 max-md:flex-col bg-white rounded-2xl border-[1px] items-center px-6 border-icePurp flex'>
                    <h1 className='text-icePurp text-3xl font-bold text-left md:w-1/2'>
                        ICE STAKING
                    </h1>
                    <div className='flex gap-2 max-md:justify-center md:justify-end md:w-1/2'>
                        <Button onClick={()=>{router.push("/collection/ice-girlz")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>ICE GIRLZ</Button>
                        <Button onClick={()=>{router.push("/collection/ice-folks")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>ICE FOLKS</Button>
                        {/* <Button onClick={()=>{router.push("/collection/wicc")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>WICC</Button> */}
                    </div>
                </div>

                <div className='w-full mt-4 h-[calc(70vh-5rem)] overflow-hidden bg-white rounded-2xl border-[1px] items-center border-icePurp flex'>
                    <NFTHolder info={collectionData[collection]} />
                </div>
            </div>
        </div>
    )
}