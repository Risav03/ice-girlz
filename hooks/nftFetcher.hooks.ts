'use client'
import { contractSetup } from '@/utils/handlers/contractSetup';
import React from 'react'
import { useAccount } from 'wagmi';

export const useNFTFetcher = () => {

    const{address} = useAccount();
    const[selected, setSelected] = React.useState<string>('Staked');
  
    const fetchNFT = async (index:number) => {
        try {
            console.log("fething fro", index)
            const contract = await contractSetup(3);
            return await contract?.getUsersNFT(index, address);
        } catch (err) {
            console.log(err);
        }
    }

    return {fetchNFT, selected, setSelected}

}
