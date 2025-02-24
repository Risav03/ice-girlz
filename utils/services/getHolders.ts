import { ethers } from "ethers";
import { contractSetup } from "../handlers/contractSetup";

export async function holdersGetter(){
    const contract = await contractSetup(2);

    const arr = []

    for(let i = 1; i<=138; i++){

        var owner = "";
        try{
            owner = await contract?.ownerOf(i);
        }
        catch(err){
            i--;
        }

        if(owner!== "")
        arr.push(`"${owner}"`);
    }

    console.log(`[${String(arr)}]`);
}