'use client'
import { usePathname } from "next/navigation";
import Button from "./items/button";
import { WalletConnectButton } from "../walletConnectButton";

export default function Navbar(){

    const pathname = usePathname()

    return(
        <div className="fixed top-0 left-0 px-6 py-4 flex w-screen justify-end">
            
                <WalletConnectButton/>

        </div>
    )
}