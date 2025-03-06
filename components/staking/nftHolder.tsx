'use client'
import { useNFTFetcher } from "@/hooks/nftFetcher.hooks"
import Button from "../UI/items/button";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
import { RiLoader5Fill } from "react-icons/ri";
import axios from "axios";
import { NotStakedCard } from "../UI/items/notStakedCard";
import { StakedCard } from "../UI/items/stakedCard";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export const NFTHolder = ({ info }: { info: any }) => {

    const { fetchNFT, selected, setSelected, handleStakeAll, loading, handleClaimAll, handleClaim } = useNFTFetcher();

    const [stakedData, setStakedData] = React.useState<any>([]);
    const [unstakedData, setUnstakedData] = React.useState<any>([]);

    const [stakedIds, setStakedIds] = React.useState<number[]>([]);
    const [unstakedIds, setUnstakedIds] = React.useState<number[]>([]);

    const [loadNfts, setLoadNfts] = React.useState<boolean>(false);

    const { address } = useAccount();

    async function fetchStakedInfo() {
        setLoadNfts(true);
        try {
            const res: any = await fetchNFT(info.index, address as `0x${string}`);

            if (res[1].length > 0) {
                if (res[1][0][0] != "") {
                    const unstakedResults = [];
                    const _unstakedIds = res[1]?.map((item: any) => Number(item[1]));
                    
                    for (let i = 0; i < res[1].length; i++) {
                        const hash = res[1][i];
                        let success = false;
                        let retries = 0;
                        const maxRetries = 3; // Set maximum number of retries
                        
                        while (!success && retries < maxRetries) {
                            try {
                                const response = await fetch(`https://azure-able-wasp-305.mypinata.cloud/ipfs/${hash[0].slice(7)}`);
                                
                                if (!response.ok) {
                                    throw new Error(`Failed to fetch`);
                                }
                                
                                setTimeout(() => {
                                    console.log("");
                                }, 50);
                                
                                const data = await response.json();
                                unstakedResults.push(data);
                                success = true;
                            } catch (error) {
                                console.error(`Attempt ${retries + 1} failed for unstaked item ${i}:`, error);
                                retries++;
                                
                                if (retries >= maxRetries) {
                                    console.error(`Max retries reached for unstaked item ${i}`);
                                }
                                
                                // Optional: add exponential backoff delay
                                await new Promise(resolve => setTimeout(resolve, 1000 * retries));
                            }
                        }
                    }
                    
                    setUnstakedData(unstakedResults);
                    setUnstakedIds(_unstakedIds);
                }
            }
            
            if (res[0].length > 0) {
                if (res[0][0][0] != "") {
                    const stakedResults = [];
                    const _stakedIds = res[0]?.map((item: any) => Number(item[1]));
                    
                    for (let i = 0; i < res[0].length; i++) {
                        const hash = res[0][i];
                        let success = false;
                        let retries = 0;
                        const maxRetries = 3; // Set maximum number of retries
                        
                        if (hash.length > 0) {
                            while (!success && retries < maxRetries) {
                                try {
                                    const response = await fetch(`https://azure-able-wasp-305.mypinata.cloud/ipfs/${hash[0].slice(7)}`);
                                    
                                    if (!response.ok) {
                                        throw new Error(`Failed to fetch`);
                                    }
                                    
                                    setTimeout(() => {
                                        console.log("");
                                    }, 50);
                                    
                                    const data = await response.json();
                                    
                                    // Add rewards to each object
                                    data.rewards = ethers.utils.formatEther(hash[2]);
                                    
                                    stakedResults.push(data);
                                    success = true;
                                } catch (error) {
                                    console.error(`Attempt ${retries + 1} failed for staked item ${i}:`, error);
                                    retries++;
                                    
                                    if (retries >= maxRetries) {
                                        console.error(`Max retries reached for staked item ${i}`);
                                    }
                                    
                                    // Optional: add exponential backoff delay
                                    await new Promise(resolve => setTimeout(resolve, 1000 * retries));
                                }
                            }
                        }
                    }
                    
                    setStakedData(stakedResults);
                    setStakedIds(_stakedIds);
                }
            }

        }
        catch (err) {
            toast.error("Error while fetching NFTs");
            console.log(err);
        }
        finally {
            setLoadNfts(false);
        }
    }

    useEffect(() => {
        if (info && address && !loading)
            fetchStakedInfo();
    }, [info, address, loading])

    return (<>

        {loading && <div className="h-screen w-screen z-50 fixed font-bold flex-col text-xl top-0 left-0 backdrop-blur-xl bg-black/20 text-white flex items-center justify-center gap-4"><RiLoader5Fill className="text-3xl animate-spin" />Loading</div>}
        <div className="h-full w-full p-6 relative">

            <div className="flex max-md:flex-col max-md:justify-center max-md:gap-2 max-md:items-center border-b-[1px] bg-white items-end pb-4 border-icePurp">
                <div className="w-fit text-nowrap">
                    <h1 className='text-icePurp text-3xl font-bold text-left w-1/2'>{info.name} Staking</h1>
                </div>

                <div className="flex gap-2 md:justify-end max-md:justify-center items-end w-full">
                    <Button selected={selected} onClick={() => { setSelected("Staked") }} >Staked</Button>
                    <Button selected={selected} onClick={() => { setSelected("Unstaked") }} >Unstaked</Button>
                </div>
            </div>

            <div className="h-full pb-[7vh]">

                <div className="h-full overflow-hidden">

                    {loadNfts ? <div className="h-full w-full flex items-center justify-center absolute top-0 left-0"><RiLoader5Fill className="text-icePurp text-4xl animate-spin" /></div>
                        :
                        <>
                            {selected == "Unstaked" ? <>
                                {unstakedIds.length > 0 && <div className="mt-2 flex justify-end">
                                    <Button onClick={() => { handleStakeAll(info.index, unstakedIds) }} selected="" >Stake All</Button>
                                </div>}
                                {unstakedData.length > 0 ? (
                                    <div className="mt-2 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 h-full overflow-y-scroll pt-4 pb-[18vh]">
                                        {unstakedData?.map((data: any, index: number) => (
                                            <div key={index}>
                                                <NotStakedCard data={data} />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <h2 className="text-icePurp/70 h-full flex items-center justify-center">No unstaked NFTs</h2>
                                )}

                            </>
                                :
                                <>
                                    {stakedIds.length > 0 && <div className="mt-2 flex justify-end">
                                        <Button onClick={() => { handleClaimAll(info.index, stakedIds) }} selected="" >Claim All</Button>
                                    </div>}
                                    {stakedData.length > 0 ? <div className="mt-2 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 h-full overflow-y-scroll pt-4 pb-[18vh]">

                                        {stakedData?.map((data: any, index: number) => (
                                            <>
                                                <StakedCard handleClaim={() => { handleClaim(stakedIds[index], info.index) }} data={data} />
                                            </>
                                        ))}
                                    </div> : <h2 className="text-icePurp/70 h-full flex items-center justify-center">No staked NFTs</h2>}

                                </>
                            }
                        </>
                    }
                </div>

            </div>

        </div>
    </>
    )
}