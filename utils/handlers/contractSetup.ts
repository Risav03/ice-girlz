import { contractAdds } from "@/utils/contractAdds";
import frostAbi from "@/utils/abis/frost";
import IGabi from "@/utils/abis/ice-girlz";
import IFabi from "@/utils/abis/ice-folks";
import { ethers } from "ethers";
import stakingAbi from "@/utils/abis/staking";
import raffleAbi from "@/utils/abis/raffles";

const add = [contractAdds.frost, contractAdds.iceGirlz, contractAdds.iceFolks, contractAdds.staking, contractAdds.raffles];
const abi = [frostAbi, IGabi, IFabi, stakingAbi, raffleAbi];

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

    // Create a proper provider with the Polygon network and Infura
    const provider = new ethers.providers.JsonRpcProvider(
      `https://polygon-mainnet.infura.io/v3/${apiKey}`
    );

    const contract = new ethers.Contract(add[index], abi[index], provider);
    return contract;
  } catch (err) {
    console.error("Error setting up fetcher contract:", err);
    return null;
  }
}