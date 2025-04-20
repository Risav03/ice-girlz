'use client'
import { RaffleHolder } from "@/components/raffles/raffleHolder";
import Background from "@/components/UI/background";
import Navbar from "@/components/UI/navbar";
import { setERC721Contract } from "@/utils/handlers/contractSetup";
import { getAllRaffles } from "@/utils/handlers/getAllRaffles";
import { useEffect, useState } from "react";

export default function Home(){

    const [active, setActive] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false);

    async function fetchRaffles(){
        try{
            setLoading(true);
            const raffles = await getAllRaffles();
    
            const res = raffles.map(async(raffle: any) => {
                const contract = await setERC721Contract(raffle.contractAddress);
                const name = await contract?.name();
                return {...raffle, name}
            })
    
            await Promise.all(res).then((values) => {
                console.log(values);
                setActive(values);
            }).catch((err) => {
                console.log(err);
            })
        }

        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchRaffles();
    },[])


    return (
        <>
            <div className="min-h-screen w-screen flex-col md:px-10 max-md:px-2 py-20 flex items-center justify-center">
                <Background/>
                <Navbar/>
                    <RaffleHolder loading={loading} raffles={active}/>

            </div>
        </>
    )
}