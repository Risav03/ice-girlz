import { contractAdds } from "@/utils/contractAdds";
import frostAbi from "@/utils/abis/frost";
import IGabi from "@/utils/abis/ice-girlz";
import IFabi from "@/utils/abis/ice-folks";
import { ethers } from "ethers";
import stakingAbi from "@/utils/abis/staking";

const add = [contractAdds.frost, contractAdds.iceGirlz, contractAdds.iceFolks, contractAdds.staking];
const abi = [frostAbi, IGabi, IFabi, stakingAbi];

export async function contractSetup(index: number) {
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

export async function fetcherContractSetup(index: number) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;
    
    if (!apiKey) {
      console.error("Infura API key not found");
      return null;
    }
    
    let provider, contract;
    
    // Check ethers version by feature detection
    if (typeof ethers.providers !== 'undefined') {
      // Ethers v5
      // Use the network name and API key properly
      // @ts-ignore
      provider = new ethers.providers.getDefaultProvider(apiKey);
    }
    
    contract = new ethers.Contract(add[index], abi[index], provider);
    return contract;
  } catch (err) {
    console.error("Error setting up fetcher contract:", err);
    return null;
  }
}