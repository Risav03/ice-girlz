'use client'
import { contractSetup, fetcherContractSetup } from '@/utils/handlers/contractSetup';
import React from 'react'
import { useAccount } from 'wagmi';

export const useNFTFetcher = () => {

    const[selected, setSelected] = React.useState<string>('Staked');
    const[loading, setLoading] = React.useState<boolean>(false);
  
    async function fetchNFT(index:number, address:`0x${string}`){

        try {
            const contract = await fetcherContractSetup(3);
            const data = await contract?.getUsersNFT(index, address);

            return data;
        } catch (err) {
            console.log(err);
        }
    }

    async function handleStake(tokenId:number, contractId:number){
        try{
            const contract = await contractSetup(3);
            await contract?.stake(tokenId, contractId);
        }
        catch(err){
            console.log(err);
            window.location.reload();

        }
    }

    async function handleClaimAll(contractId:number, tokenIds:number[]){
        setLoading(true);
        try{
            const contract = await contractSetup(3);
            const res = await contract?.claimAll(tokenIds, contractId);

            await res.wait();
        }
        catch(err){
            setLoading(false);
            console.log(err);
        }
        finally{
            setLoading(false);
            window.location.reload();
        }
    }

    async function handleStakeAll(contractId:number, tokenIds:number[]){
        setLoading(true);
        try{
            const contract = await contractSetup(3);
            const res = await contract?.batchStake(tokenIds, contractId);

            await res.wait();
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
            window.location.reload();
        }
    }

    async function handleClaim(tokenId:number, contractId:number){
        setLoading(true);
        try{
            const contract = await contractSetup(3);
            const res = await contract?.claim(tokenId, contractId);

            await res.wait();
        }
        catch(err){
            setLoading(false);
            console.log(err);
        }
        finally{
            setLoading(false);
            window.location.reload();
        }
    }

    return {fetchNFT, selected, setSelected, handleStake, handleStakeAll, loading, handleClaimAll, handleClaim}

}
