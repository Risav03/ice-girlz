'use client'

import Background from "@/components/UI/background"
import Button from "@/components/UI/items/button"
import { useRouter } from "next/navigation"

export default function Home(){

    const router = useRouter()

    return (
        <div className="min-h-screen w-screen flex-col md:px-10 max-md:px-4 py-20 flex items-center justify-center">
            <Background/>
            <div className="bg-black/40 p-10 rounded-xl shadow-xl flex items-center justify-center flex-col">
                <h1 className="text-3xl font-bold mb-10">Nothing to see here</h1>
                <h2 className="">Redirecting to staking...</h2>
            </div>
        </div>
    )
}