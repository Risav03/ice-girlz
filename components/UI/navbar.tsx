
'use client'
import { usePathname, useRouter } from "next/navigation";
import { WalletConnectButton } from "../walletConnectButton";
import Button from "./items/button";

export default function Navbar(){

    const pathname = usePathname()
    const router = useRouter()


    return(
        <div className="w-screen fixed max-md:flex-col top-2 flex px-2">
            <div className="md:w-1/2 flex gap-2">
                <Button selected={`${pathname.includes("collection") && "staking"}`} onClick={()=>{router.push("/collection/ice-girlz")}} >STAKING</Button>
                <Button selected={`${pathname.includes("raffles") && "raffles"}`} onClick={()=>{router.push("/raffles")}} >RAFFLES</Button>
            </div>
            <div className="md:w-1/2 flex md:justify-end">
                    <WalletConnectButton/>
            </div>
        </div>
    )
}