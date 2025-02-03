'use client'
import { useNFTFetcher } from "@/hooks/nftFetcher.hooks"
import Button from "../UI/items/button";

export const NFTHolder = () => {

    const {fetchNFT} = useNFTFetcher();

    return(
        <div className="h-full w-full p-4">
            <div className="flex gap-2 justify-end items-end w-full">
                <Button selected="Staked" >Staked</Button>
                <Button selected="Unstaked" >Unstaked</Button>
            </div>
        </div>
    )
}