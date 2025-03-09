
import { WalletConnectButton } from "../walletConnectButton";

export default function Navbar(){

    return(
        <div className="fixed top-0 left-0 md:px-6 md:py-4 max-md:px-3 max-md:py-2 flex w-screen justify-end">
            
                <WalletConnectButton/>

        </div>
    )
}