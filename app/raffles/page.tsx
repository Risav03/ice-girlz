'use client'
import Background from "@/components/UI/background";
import Navbar from "@/components/UI/navbar";
import { getAllRaffles } from "@/utils/handlers/getAllRaffles";
import { useEffect } from "react";

export default function Home(){

    async function fetchRaffles(){
        const raffles = await getAllRaffles();
        console.log(raffles);
    }

    useEffect(()=>{
        fetchRaffles();
    },[])


    return (
        <>
            <div className="min-h-screen w-screen flex-col md:px-10 max-md:px-4 py-20 flex items-center justify-center">
                <Background/>
                <Navbar/>
                <div className='w-full max-md:py-4 max-md:gap-2 md:h-20 max-md:flex-col bg-white rounded-2xl border-[1px] items-center px-6 border-icePurp flex'>
                
            </div>
            </div>
        </>
    )
}