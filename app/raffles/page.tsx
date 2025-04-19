'use client'
import { RaffleHolder } from "@/components/raffles/raffleHolder";
import Background from "@/components/UI/background";
import Navbar from "@/components/UI/navbar";
import { getAllRaffles } from "@/utils/handlers/getAllRaffles";
import { useEffect, useState } from "react";

export default function Home(){

    const [active, setActive] = useState<any>([])

    async function fetchRaffles(){
        const raffles = await getAllRaffles();
        setActive(raffles)
    }

    useEffect(()=>{
        fetchRaffles();
    },[])


    return (
        <>
            <div className="min-h-screen w-screen flex-col md:px-10 max-md:px-4 py-20 flex items-center justify-center">
                <Background/>
                <Navbar/>
                    <RaffleHolder raffles={active}/>

            </div>
        </>
    )
}