'use client'

import Button from "@/components/UI/items/button"
import { useRouter } from "next/navigation"

export default function Home(){

    const router = useRouter()

    return (
        <div className="min-h-screen w-screen flex-col md:px-10 max-md:px-4 py-20 flex items-center justify-center">
            <h1 className="text-3xl font-bold mb-10">Ice Staking</h1>
            <div className="flex gap-2">
                <Button onClick={()=>{router.push("/collection/ice-girlz")}} selected="none" >Ice Girlz</Button>
                <Button onClick={()=>{router.push("/collection/ice-folks")}} selected="none" >Ice Folks</Button>
                <Button onClick={()=>{router.push("/collection/wicc")}} selected="none" >WICC</Button>
            </div>
        </div>
    )
}