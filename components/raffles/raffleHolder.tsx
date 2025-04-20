'use client'
import React from 'react'
import { RaffleCards } from './raffleCards'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { RiLoader5Fill } from 'react-icons/ri'

export const RaffleHolder = ({ raffles, loading }: { raffles: any, loading:boolean }) => {

    const [page, setPage] = React.useState(0);

    return (
        // <div className="min-h-screen h-screen w-screen md:px-10 max-md:px-4 pt-24 pb-12 flex items-center justify-center">
            <div className='md:w-[70vw] md:min-w-[700px] bg-white max-md:w-full py-4 rounded-2xl border-[1px] items-center border-icePurp '>
                <div className='w-full relative'>
                    <h1 className='text-icePurp px-4 text-3xl mb-4 max-md:hidden font-bold text-left md:w-1/2'>
                        RAFFLES
                    </h1>
                    <div className='flex items-center w-full md:gap-3 gap-1'>
                        <button onClick={()=>{if(page > 0){setPage(prev => prev-1)}}} className='md:w-[3%] max-md:w-[6%] max-sm:[10%] border-y-[1px] border-r-[1px] border-icePurp active:scale-110 rounded-r-xl py-4 hover:bg-icePurp group duration-200'>
                            <FaArrowLeft className='text-icePurp mx-auto group-hover:text-white duration-200' />
                        </button>
                        <div className='md:w-[94%] max-md:w-[88%] max-sm:[80%] h-[440px] items-center flex justify-center gap-4'>
                            {loading ? <RiLoader5Fill className='animate-spin text-4xl text-icePurp mx-auto' /> :<div>
                            {raffles.map((raffle: any, i:number) => (
                                <div className=''>
                                    { i == page && <RaffleCards values={raffle} />}
                                </div>
                            ))}
                            </div>}
                        </div>
                        <button onClick={()=>{if(page < raffles.length){setPage(prev => prev+1)}}} className='md:w-[3%] max-md:w-[6%] max-sm:[10%] border-y-[1px] border-l-[1px] border-icePurp active:scale-110 rounded-l-xl py-4 hover:bg-icePurp group duration-200'>
                            <FaArrowRight className='text-icePurp group-hover:text-white mx-auto duration-200' />
                        </button>
                    </div>

                </div>
            </div>
        // </div>
    )
}
