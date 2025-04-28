'use client'
import React from 'react'
import { RaffleCards } from './raffleCards'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { RiLoader5Fill } from 'react-icons/ri'

export const RaffleHolder = ({ raffles, loading }: { raffles: any, loading:boolean }) => {

    const [page, setPage] = React.useState(0);

    if(raffles.length > 0)
    return (
        // <div className="min-h-screen h-screen w-screen md:px-10 max-md:px-4 pt-24 pb-12 flex items-center justify-center">
            <div className='md:w-[70vw] max-md: mt-2 md:min-w-[700px] bg-white max-md:w-full pb-4 pt-8 rounded-2xl border-[1px] items-center border-icePurp '>
                <div className='w-full relative'>
                    <div className='flex items-center w-full md:gap-3 gap-1'>
                        {page > 0 ?  <button onClick={()=>{if(page > 0){setPage(prev => prev-1)}}} className='md:w-[3%] max-md:w-[6%] max-sm:w-[10%] border-y-[1px] border-r-[1px] border-icePurp active:scale-110 rounded-r-xl py-4 hover:bg-icePurp group duration-200'>
                            <FaArrowLeft className='text-icePurp mx-auto group-hover:text-white duration-200' />
                        </button> : <div className='md:w-[3%] max-md:w-[6%] max-sm:w-[10%]'></div>}
                       
                        <div className='md:w-[94%]  max-md:w-[88%] max-sm:[80%] gap-4'>
                            {loading ? <RiLoader5Fill className='animate-spin text-4xl text-icePurp mx-auto' /> :<div>
                            {raffles.map((raffle: any, i:number) => (
                                <>
                                
                                    { i == page &&     <div className=' relative w-full min-h-[400px] gap-4 '>

                                    <h2 className='text-2xl font-bold text-icePurp mb-4'>{i+1}/{raffles.length}</h2>
                                    <RaffleCards values={raffle} /></div>}
                                </>
                            ))}
                            </div>}
                        </div>
                        {
                           page+1 < raffles.length && raffles.length > 1 ? <button onClick={()=>{if(page+1 < raffles.length && raffles.length > 1){setPage(prev => prev+1)}}} className='md:w-[3%] max-md:w-[6%] max-sm:w-[10%] border-y-[1px] border-l-[1px] border-icePurp active:scale-110 rounded-l-xl py-4 hover:bg-icePurp group duration-200'>
                           <FaArrowRight className='text-icePurp group-hover:text-white mx-auto duration-200' />
                       </button> : <div className='md:w-[3%] max-md:w-[6%] max-sm:w-[10%]'></div> 
                        }
                        
                    </div>

                </div>
            </div>
        // </div>
    )

    else{
        return (
            <div className="border-[1px] max-md:hidden border-icePurp rounded-xl md:w-[70vw] md:min-w-[700px] h-20 text-3xl font-bold text-icePurp flex items-center justify-start px-8 bg-white mt-10"> <h2 className="mx-auto py-20">No Active Raffles!</h2></div>
        )
    }
}
