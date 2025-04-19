import React from 'react'
import { RaffleCards } from './raffleCards'

export const RaffleHolder = ({raffles}:{raffles:any}) => {
    return (
        <div className="min-h-screen h-screen w-screen md:px-10 max-md:px-4 pt-24 pb-12 flex items-center justify-center">
        <div className='w-[70vw] md:min-w-[700px] max-md:w-full md:h-[70vh] h-[85vh]'>
            <div className='w-full max-md:py-4 max-md:gap-2 md:h-20 max-md:flex-col bg-white rounded-2xl border-[1px] items-center px-6 border-icePurp flex'>
                <h1 className='text-icePurp text-3xl max-md:hidden font-bold text-left md:w-1/2'>
                    RAFFLES
                </h1>
            </div>
            {raffles.map((raffle:any)=>(
                <RaffleCards contractAdd={raffle.contractAddress} tokenId={raffle.tokenId}/>
            ))}
        </div>
        </div>
    )
}
