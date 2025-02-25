import { ethers } from "ethers";
import { contractSetup } from "./contractSetup";
import { toast } from "react-toastify";

export async function fetchFrostBal(account:string){
    try{
        const contract = await contractSetup(0);
        const bal = Number(ethers.utils.formatEther(await contract?.balanceOf(account)));
    
        return bal;

    }
    catch(err){
        console.log(err);
        toast.error("Failed to fetch $FROST balance");
    }
}