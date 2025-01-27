import iceGirlz from '@/utils/abis/ice-girlz'
import React from 'react'
import Button from '../UI/items/button'

const collectionData = {
    "iceGirlz": {
        name: 'Ice Girlz'
    }
} as const

type CollectionKey = keyof typeof collectionData

// Update the component props type
export const StakeHolder = ({collection}: {collection: CollectionKey}) => {
    return (
        <div className="min-h-screen w-screen md:px-10 max-md:px-4 py-20 flex items-center justify-center">
            <div className='w-[70vw] h-[70vh]'>
                <div className='w-full h-20 bg-white rounded-2xl border-[1px] items-center px-6 border-icePurp flex'>
                    <h1 className='text-icePurp text-3xl font-bold text-left w-1/2'>
                        {collectionData[collection].name}
                    </h1>
                    <div className='flex gap-2 justify-end w-1/2'>
                        <Button selected='staked'>Staked</Button>
                        <Button selected='staked'>Unstaked</Button>

                    </div>
                </div>
            </div>
        </div>
    )
}