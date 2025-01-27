import { ethers } from "ethers";
import { contractSetup } from "./contractSetup";

export async function fetchFrostBal(account:string){
    const contract = await contractSetup(0);
    const bal = Number(ethers.utils.formatEther(await contract?.balanceOf(account)));

    return bal;
}