'use client'
import { StakingSettings } from "@/components/admin/staking/stakingSettings";
import Background from "@/components/UI/background";
import Button from "@/components/UI/items/button";
import Navbar from "@/components/UI/navbar";
import { contractSetup } from "@/utils/handlers/contractSetup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home(){
    const {address} = useAccount()
    const router = useRouter()
    const [owner, setOwner] = useState<string | null>(null);

    async function getOwner(){
        try{
            const contract = await contractSetup(4);
            const ownerAcc = await contract?.owner()

            setOwner(ownerAcc);
         
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getOwner()
    },[])

    if(owner && address && address == owner){
    return (
        <div className="min-h-screen w-screen flex-col md:px-10 max-md:px-4 py-20 flex items-center justify-center">
            <Background/>
            <Navbar/>
            <div className='w-full h-full max-md:py-4 max-md:gap-2 p-4 flex-col bg-white rounded-2xl border-[1px] items-center px-6 border-icePurp flex'>
                <div className="flex max-md:flex-col w-full">
                    <h1 className='text-icePurp text-3xl max-md:hidden font-bold text-left md:w-1/2'>
                        ADMIN Staking
                    </h1>
                    <div className="flex gap-2 justify-end w-full">
                        <Button selected="false" onClick={()=>{router.push("/admin/raffles")}} >Raffle</Button>
                    </div>
                </div>
            <StakingSettings/>
            </div>

        </div>
    )
}

    else{
        return (
            <div className="min-h-screen w-screen flex-col md:px-10 max-md:px-4 py-20 flex items-center justify-center">
                <Background/>
                <Navbar/>
                <h1 className="text-4xl font-bold">ACCESS RESTRICTED</h1>
                <h3>If you are the owner connect using {owner}</h3>
            </div>
        )
    }
}