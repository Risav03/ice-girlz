'use client'

import Background from "@/components/UI/background"
import Button from "@/components/UI/items/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import logo from "@/assets/landing-logo.png"
import React from "react"
import { RiLoader5Fill } from "react-icons/ri"

export default function Home(){

    const router = useRouter()
    const [loading1, setLoading1] = React.useState(false)
    const [loading2, setLoading2] = React.useState(false)

    return (
        <div className="min-h-screen w-screen flex-col md:px-10 max-md:px-4 py-20 flex items-center justify-center">
            <Background/>
            <Image src={logo} alt="logo" className="w-72 aspect-square" />
            <div className="flex gap-4 mt-4">
                <button className="w-40 py-2 text-xl font-bold bg-white text-icePurp hover:-translate-y-1 duration-200 border-[1px] border-icePurp rounded-full" onClick={()=>{setLoading1(true); router.push("/collection/ice-girlz")}} >{loading1 ? <RiLoader5Fill className="mx-auto animate-spin text-xl"/> : "STAKING"}</button>
                <button className="w-40 py-2 text-xl font-bold bg-white text-icePurp hover:-translate-y-1 duration-200 border-[1px] border-icePurp rounded-full" onClick={()=>{setLoading2(true); router.push("/raffles")}} >{loading2 ? <RiLoader5Fill className="mx-auto animate-spin text-xl"/> : "RAFFLES"}</button>
            </div>
        </div>
    )
}