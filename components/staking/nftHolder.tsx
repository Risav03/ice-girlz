'use client'
import { useNFTFetcher } from "@/hooks/nftFetcher.hooks"
import Button from "../UI/items/button";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

export const NFTHolder = ({info}:{info:any}) => {

    const {fetchNFT, selected, setSelected} = useNFTFetcher();

    const [stakedData, setStakedData] = React.useState<any>([]);
    const [unstakedData, setUnstakedData] = React.useState<any>([]);

    const {address} = useAccount();

    async function fetchStakedInfo(){
        try{
            const res:any = await fetchNFT(info.index);
            console.log(res, info.index, address);
            // console.log(res[1])
            // // @ts-ignore
            setStakedData(res[0]);
            // // @ts-ignore
            setUnstakedData(res[1]);

        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        if(info && address)
        fetchStakedInfo();
    },[info, address])

    return(
        <div className="h-full w-full p-6">
            <div className="flex border-b-[1px] items-end pb-4 border-icePurp">
                <div className="w-fit text-nowrap">
                <h1 className='text-icePurp text-3xl font-bold text-left w-1/2'>{info.name} Staking</h1>
                </div>

                <div className="flex gap-2 justify-end items-end w-full">
                    <Button selected={selected} onClick={()=>{setSelected("Staked")}} >Staked</Button>
                    <Button selected={selected} onClick={()=>{setSelected("Unstaked")}} >Unstaked</Button>
                </div>
            </div>

            <div className="pt-4 text-black">
                {unstakedData[0]}
            </div>
        </div>
    )
}