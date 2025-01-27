import {contractAdds} from "@/utils/contractAdds";
import frostAbi from "@/utils/abis/frost";
import IGabi from "@/utils/abis/ice-girlz";
import { ethers } from "ethers";

const add = [contractAdds.frost, contractAdds.iceGirlz];
const abi = [frostAbi, IGabi];

export async function contractSetup(index: number){
    try {
        // @ts-ignore
        if (typeof window.ethereum !== 'undefined') {
          //@ts-ignore
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
  
          const contract = new ethers.Contract(add[index], abi[index], signer);

          return contract;
        }
      }
      catch (err) {
        console.log(err);
      }
}