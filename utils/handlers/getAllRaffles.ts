import { ethers } from "ethers";
import { contractSetup } from "./contractSetup"

export async function getAllRaffles(){
    try{
        const contract = await contractSetup(4);
        const raffles = await contract?.fetchActiveRaffles()

        const newRaffles = raffles.map((raffle: any) => {
            return {
                contractAddress: raffle.contractAdd,
                frostPrice: Number(ethers.utils.formatEther(raffle.frostPrice)),
                maxAllowed: Number(raffle.maxAllowed),
                maxOwnAllowed: Number(raffle.maxOwnAllowed),
                sold: Number(raffle.sold),
                tokenId: Number(raffle.tokenId),
            };
        });

        return newRaffles;
    }
    catch(err){
        console.log(err)
    }
}