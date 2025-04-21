'use client'
import { contractSetup } from '@/utils/handlers/contractSetup'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { RiLoader5Fill } from 'react-icons/ri'

export const AdminRaffleCards = ({values}:{values:any}) => {

    const [loading, setLoading] = React.useState<boolean>(false);

    async function deleteS3(){
        try{
            const res = await axios.post("/api/deleteFromS3", {key: `raffles/${values.contractAdd}-${values.tokenId}`});
            if(res.status == 200){
                return true;
            }
        }
        catch(err){
            console.log(err);
            return false;
        }
        finally{
            setLoading(false);
        }
    }

    async function deleteRaffle() {
        try{
            setLoading(true);
            const contract = await contractSetup(4);
            const tx = await contract?.deleteRaffle(values.index);
            await tx.wait();
            const res = await deleteS3();
            if(res == true){
                alert("Deleted");
                window.location.reload()
            }
        }
        catch(err){
            console.log(err);
        }
        
    }

    async function pickWinner() {
        try{
            setLoading(true);
            const contract = await contractSetup(4);
            const tx = await contract?.declareWinner(values.index);
            await tx.wait();
            const res = await deleteS3()

            if(res == true){
                alert("Winner picked");
                window.location.reload()
            }
        }
        catch(err){
            console.log(err);
        }
        
    }

  return (
    <div className='flex relative w-60 flex-col items-center rounded-xl p-1 justify-center border-2 border-icePurp border-dashed gap-4 '>
      <div className='w-52 aspect-square object-cover  p-2 rounded-xl'>
        <Image alt='wow' height={1080} width={1080} src={`https://icegirlz.s3.ap-south-1.amazonaws.com/raffles/${values.contractAddress.toLowerCase()}-${values.tokenId}`} />
      </div>
      <div className='p-4'>
        <div className='flex items-center gap-4'>
          <h2 className='text-icePurp text-xl font-bold'>{values.name} #{values.tokenId}</h2>
          <Link className='text-icePurp text-lg hover:scale-105 duration-200' href={values.opensea} target='blank' ><FaExternalLinkAlt/></Link>
        </div>
        <div className='flex-col gap-1'>
          <div className='p-1 mt-2 text-nowrap border-[1px] text-sm flex items-center justify-center text-icePurp font-black border-icePurp rounded-full'>
            Ends on: {new Date(values.endTime*1000).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </div>
          <div className='p-1 mt-2 text-nowrap border-[1px] text-sm flex items-center justify-center text-icePurp font-black border-icePurp rounded-full'>
            Total Holders: {values.holders.length}
          </div>
        </div>

        {loading ? <RiLoader5Fill className='animate-spin text-2xl mx-auto mt-4 text-icePurp' /> : <div className='flex gap-1 w-full items-center justify-center mt-4'>
            <button onClick={pickWinner} className='text-white bg-icePurp px-4 py-1 rounded-full font-bold hover:-translate-y-1 duration-200'>Winner</button>
            <button onClick={deleteRaffle} className='text-red-500 px-4 py-1 rounded-full font-bold hover:-translate-y-1 duration-200'>Delete</button>
        </div>}

      </div>
    </div>
  )
}
