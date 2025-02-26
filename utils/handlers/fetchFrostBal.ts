import { ethers } from "ethers";
import { contractSetup, fetcherContractSetup } from "./contractSetup";
import { toast } from "react-toastify";

export async function fetchFrostBal(account:string){
    try{
        const contract = await fetcherContractSetup(0);
        const bal = Number(ethers.utils.formatEther(await contract?.balanceOf(account)));
    
        return Number(bal.toFixed(2));

    }
    catch(err){
        console.log(err);
        toast.error("Failed to fetch $FROST balance");
    }
}