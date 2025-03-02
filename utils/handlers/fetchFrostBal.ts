import { ethers } from "ethers";
import { contractSetup, fetcherContractSetup } from "./contractSetup";
import { toast } from "react-toastify";

export async function fetchFrostBal(account:string){
    try{

        console.log("FETCHING FROST BALANCE FOR: ", account)

        const contract = await fetcherContractSetup(0);
        const bal = Number(ethers.utils.formatEther(await contract?.balanceOf(account)));
        console.log("USER HAS $FROST BALANCE OF: ", bal);
        return Number(bal.toFixed(2));

    }
    catch(err){
        console.log(err);
        toast.error("Failed to fetch $FROST balance");
    }
}