'use client'
import erc20abi from '@/utils/abis/erc20abi'
import { contractAdds } from '@/utils/contractAdds'
import { contractSetup } from '@/utils/handlers/contractSetup'
import { ethers } from 'ethers'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { RiLoader5Fill } from 'react-icons/ri'

export const RaffleCards = ({values}:{values:any}) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tickets, setTickets] = useState<number>(0)


  async function setERC20() {
    // @ts-ignore
    if(window && window?.ethereum !== undefined){
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    try {
      const contract = new ethers.Contract(contractAdds.frost, erc20abi, signer);

      return contract;
    }
    catch (err) {
      console.log(err);
    }
  }
  }

  async function approve() {
    try{
      setLoading(true);
      const contract = await setERC20();
      const tx = await contract?.approve(contractAdds.raffles, ethers.utils.parseEther((values.frostPrice*tickets).toString()));
      await tx.wait();
      buyTickets();
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }


  async function buyTickets(){
    try{
      setLoading(true);

      const contract = await contractSetup(4);
      const tx = await contract?.enterFrostRaffle(values.index, tickets);
      await tx.wait();
      setOpenModal(false);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }

    return (
    <div className='flex relative w-full min-h-[400px] justify-center items-center max-md:flex-col max-md:items-center max-md:justify-center gap-4 '>
      <div className='h-fit border-2 border-icePurp p-2 rounded-xl border-dashed'>
        <Image alt='wow' height={1080} width={1080} src={`https://icegirlz.s3.ap-south-1.amazonaws.com/raffles/${values.contractAddress.toLowerCase()}-${values.tokenId}`} className='object-cover md:w-[500px] max-sm:w-[350px] max-md:w-[450px] aspect-square rounded-lg' />
      </div>
      <div className='p-4 w-full'>
        <div className='flex items-center gap-4'>
          <h2 className='text-icePurp text-3xl font-bold'>{values.name} #{values.tokenId}</h2>
          <Link className='text-icePurp text-xl hover:scale-105 duration-200' href={values.opensea} target='blank' ><FaExternalLinkAlt/></Link>
        </div>
        <div className='text-icePurp text-lg mt-2'>
          1 Ticket = {values.frostPrice } $FROST
        </div>
        <div className='flex gap-1 max-md:flex-col'>
          <div className='py-1 px-2 mt-2 text-nowrap border-[1px] text-sm flex items-center justify-center text-icePurp font-black border-icePurp rounded-full'>
            Ends on: {new Date(values.endTime*1000).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </div>
          <div className='py-1 px-2 mt-2 text-nowrap border-[1px] text-sm flex items-center justify-center text-icePurp font-black border-icePurp rounded-full'>
            Total Holders: {values.holders.length}
          </div>
        </div>

        <div className='border-2 border-icePurp border-dashed w-full rounded-xl p-2 mt-4 '>
            <h2 className='text-sm text-icePurp'>You Own:</h2>
            <h2 className='text-3xl text-icePurp font-bold max-md:text-center my-2'>{values.holding} Tickets</h2>
            <div className='flex gap-1 mt-2 w-full'>
              {openModal ? <div className='w-full my-2'>
                <div className='flex max-md:flex-col gap-2 items-center justify-center'>
                  <div className='flex gap-[0.1rem] md:w-[30%] flex-wrap'>
                    <button onClick={()=>{if(tickets-1>0){setTickets(prev => prev-1)}}} className='border-[1px] border-icePurp rounded-full p-[0.05rem] text-icePurp text-xs w-10 font-bold' >-1</button>
                    <button onClick={()=>{if(tickets-10>0){setTickets(prev => prev-10)}}} className='border-[1px] border-icePurp rounded-full p-[0.05rem] text-icePurp text-xs w-10 font-bold' >-10</button>
                    <button onClick={()=>{if(tickets-100>0){setTickets(prev => prev-100)}}} className='border-[1px] border-icePurp rounded-full p-[0.05rem] text-icePurp text-xs w-10 font-bold' >-100</button>
                  </div>
                  <div className='text-xl font-bold w-[40%] flex justify-center text-icePurp'>{tickets}</div>
                  <div className='flex gap-[0.1rem] md:w-[30%] flex-wrap'>
                    <button onClick={()=>{setTickets(prev => prev+1)}} className='border-[1px] border-icePurp rounded-full p-[0.05rem] text-icePurp text-xs w-10 font-bold' >+1</button>
                    <button onClick={()=>{setTickets(prev => prev+10)}} className='border-[1px] border-icePurp rounded-full p-[0.05rem] text-icePurp text-xs w-10 font-bold' >+10</button>
                    <button onClick={()=>{setTickets(prev => prev+100)}} className='border-[1px] border-icePurp rounded-full p-[0.05rem] text-icePurp text-xs w-10 font-bold' >+100</button>
                  </div>
                </div>
                {loading ? <RiLoader5Fill className='animate-spin mt-4 text-icePurp mx-auto text-2xl' /> :<div className='mt-4'>
                  <button onClick={()=>{approve()}} className='rounded-full bg-icePurp w-1/2 font-bold text-white py-2 hover:-translate-y-1 duration-200'>Confirm</button>
                  <button onClick={()=>{setOpenModal(false)}} className='rounded-full w-1/2 font-bold text-icePurp py-2 hover:-translate-y-1 duration-200'>Cancel</button>
                </div>}
              </div> :<>
                <button onClick={()=>{setOpenModal(true)}} className='rounded-full bg-icePurp w-1/2 font-bold text-white py-2 hover:-translate-y-1 duration-200'>{values.holding > 0 ? "Buy More" : "Enter Raffle"}</button>
                <button className='rounded-full w-1/2 font-bold text-icePurp py-2 hover:-translate-y-1 duration-200'>View Details</button>
              </>}
            </div>
        </div>
      </div>
    </div>
  )
}
