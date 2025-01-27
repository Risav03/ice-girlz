'use client'
import { usePathname } from "next/navigation";
import Button from "./items/button";
import { WalletConnectButton } from "../walletConnectButton";

export default function Navbar(){

    const pathname = usePathname()

    return(
        <div className="fixed top-0 left-0 px-6 py-4 flex w-screen">
            <div className="w-1/2 flex gap-2">
                <Button selected={pathname.split("/")[1]}>Stake</Button>
                <Button selected={pathname.split("/")[1]}>Raffle</Button>
            </div>
            <div className="w-1/2 flex justify-end">
                <WalletConnectButton/>
            </div>
        </div>
    )
}