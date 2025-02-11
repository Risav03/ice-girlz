'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
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

    return (
        <div className="min-h-screen w-screen md:px-10 max-md:px-4 py-20 flex items-center justify-center">
            <div className='w-[70vw] min-w-[700px] h-[70vh]'>
                <div className='w-full h-20 bg-white rounded-2xl border-[1px] items-center px-6 border-icePurp flex'>
                    <h1 className='text-icePurp text-3xl font-bold text-left w-1/2'>
                        ICE STAKING
                    </h1>
                    <div className='flex gap-2 justify-end w-1/2'>
                        <Button onClick={()=>{router.push("/collection/ice-girlz")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>ICE GIRLZ</Button>
                        <Button onClick={()=>{router.push("/collection/ice-folks")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>ICE FOLKS</Button>
                        {/* <Button onClick={()=>{router.push("/collection/wicc")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>WICC</Button> */}
                    </div>
                </div>

                <div className='w-full mt-4 h-[calc(70vh-5rem)] bg-white rounded-2xl border-[1px] items-center border-icePurp flex'>
                    <NFTHolder info={collectionData[collection]} />
                </div>
            </div>
        </div>
    )
}