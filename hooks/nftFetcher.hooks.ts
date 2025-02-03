'use client'
import { contractSetup } from '@/utils/handlers/contractSetup';
import React from 'react'
import { useAccount } from 'wagmi';

export const useNFTFetcher = () => {

    const{address} = useAccount();
  
    const fetchNFT = async () => {
        try {
            const contract = await contractSetup(3);
            console.log(await contract?.getUsersNFT(2, address));
        } catch (err) {
            console.log(err);
        }
    }

    return {fetchNFT}

}
