'use client'
import Button from '@/components/UI/items/button';
import { contractSetup } from '@/utils/handlers/contractSetup';
import { ethers } from 'ethers';
import React, { use, useEffect } from 'react'

export const StakingSettings = () => {

    const [rewards, setRewards] = React.useState<any>(null);
    const [rewardsInd, setRewardsInd] = React.useState<string>("");

    const [allowedInd, setAllowedInd] = React.useState<string>("");
    const [allowedRes, setAllowedRes] = React.useState<string>("");

    const [removeInd, setRemoveInd] = React.useState<string>("");
    const [removeRes, setRemoveRes] = React.useState<string>("");

    const [newOwner, setNewOwner] = React.useState<string>("");
    const [newOwnerRes, setNewOwnerRes] = React.useState<string>("");

    const [contractIndex, setContractIndex] = React.useState<string>("");
    const [bonus, setBonus] = React.useState<string>("");
    const [startDate, setStartDate] = React.useState<string>("");
    const [endDate, setEndDate] = React.useState<string>("");
    const [bonusRes, setBonusRes] = React.useState<string>("");

    const [CAIndex, setCAIndex] = React.useState<string>("");
    const [newEmission, setNewEmission] = React.useState<string>("");
    const [newEmissionRes, setNewEmissionRes] = React.useState<string>("");

    async function fetchRewards() {
        try {
            const contract = await contractSetup(3);
            const emission = await contract?.emissionRate(rewardsInd);

            setRewards(Number(ethers.utils.formatEther(emission)));
        }
        catch (err) {
            console.log(err);
        }
    }

    async function fetchAllowedContracts() {
        try {
            const contract = await contractSetup(3);
            const allowed = await contract?.allowedContracts(allowedInd);

            setAllowedRes(allowed);
        }
        catch (err) {
            console.log(err);
        }
    }

    async function removeContract() {
        try {
            const contract = await contractSetup(3);
            const tx = await contract?.removeContract(removeInd);

            await tx.wait().then((res: any) => {
                setRemoveRes("Done")
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async function transferOwnership() {
        try {
            const contract = await contractSetup(3);
            const tx = await contract?.transferOwnership(newOwner);

            await tx.wait().then((res: any) => {
                setNewOwnerRes("Done")
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async function setBonusPeriod() {
        try {
            const contract = await contractSetup(3);
            const tx = await contract?.addSpecialEmission(contractIndex, ethers.utils.parseEther(bonus), startDate, endDate);

            await tx.wait().then((res: any) => {
                setBonusRes("Done")
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async function changeEmission() {
        try {
            const contract = await contractSetup(3);
            const tx = await contract?.changeEmission(CAIndex, ethers.utils.parseEther(newEmission));

            await tx.wait().then((res: any) => {
                setNewEmissionRes("Done")
            });
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='w-1/2 h-full mt-4'>
            {/* <div className='flex justify-end gap-2'>
            <Button onClick={()=>{setCollection("ice-girlz")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>ICE GIRLZ</Button>
            <Button onClick={()=>{setCollection("ice-folks")}} selected={collection.includes("-") ? collection.replace("-"," ") : collection}>ICE FOLKS</Button>
        </div> */}
            <div className='flex-col gap-4 h-full w-full'>
                <div className='border-b-[1px] border-icePurp/30 mb-4'>
                    <h2 className='text-lg font-bold text-icePurp'>Read</h2>
                    <InputWithButton placeholder="Check index 1,2,3..." info='Emission Rate (daily reward amount)' value={rewardsInd} setValue={setRewardsInd} result={rewards} callback={fetchRewards} />
                    <InputWithButton placeholder="Check index 1,2,3..." info='Allowed Contracts (your collections that can leverage staking benefits)' value={allowedInd} setValue={setAllowedInd} result={allowedRes} callback={fetchAllowedContracts} />
                    <div>

                    </div>
                </div>

                <div className=''>
                    <h2 className='text-lg font-bold text-icePurp'>Write</h2>
                    <InputWithButton placeholder="Index (1, 2, ...)" info='Remove Contract' value={removeInd} setValue={setRemoveInd} result={removeRes} callback={removeContract} />
                    <InputWithButton placeholder="New Owner" info='Transfer Ownership' value={newOwner} setValue={setNewOwner} result={newOwnerRes} callback={transferOwnership} />

                    <div className='flex-col flex gap-2 border-[1px] border-icePurp/30 mb-4 p-2 rounded-lg'>
                        <h2 className='text-sm font-bold text-icePurp'>Change Emission</h2>
                        <input placeholder="Contract Index" type="text" value={CAIndex} onChange={(e) => { setCAIndex(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2 ' />
                        <input placeholder="New Emission (1, 2, ...)" type="text" value={newEmission} onChange={(e) => { setNewEmission(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2' />

                        <button className='bg-icePurp rounded-lg p-2 font-bold text-white' onClick={changeEmission}>Execute</button>

                        <div className='min-h-4 text-icePurp text-sm mt-1'>
                            {newEmissionRes && <p>{newEmissionRes}</p>}
                        </div>
                    </div>

                    <div className='flex-col flex gap-2 border-[1px] border-icePurp/30 p-2 rounded-lg'>
                        <h2 className='text-sm font-bold text-icePurp'>Set Bonus Period</h2>
                        <input placeholder="Contract Index" type="text" value={contractIndex} onChange={(e) => { setContractIndex(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2 ' />
                        <input placeholder="Additional Bonus" type="text" value={bonus} onChange={(e) => { setBonus(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2' />
                        <div>
                            <h2 className='text-xs font-bold mb-[0.1rem] text-icePurp'>Start Time</h2>
                            <input type='date' onChange={(e) => { setStartDate(String(((new Date(e.target.value)).getTime()) / 1000)) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2'></input>
                        </div>
                        <div>
                            <h2 className='text-xs font-bold mb-[0.1rem] text-icePurp'>End Time</h2>
                            <input type='date' onChange={(e) => { setEndDate(String(((new Date(e.target.value)).getTime()) / 1000)) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2'></input>
                        </div>
                        <button className='bg-icePurp rounded-lg p-2 font-bold text-white' onClick={setBonusPeriod}>Execute</button>
                        <div className='min-h-4 text-icePurp text-sm mt-1'>
                            {bonusRes && <p>{bonusRes}</p>}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export function InputWithButton({ info, placeholder, value, setValue, result, callback }: { info: string, placeholder: string, value: string, setValue: React.Dispatch<React.SetStateAction<string>>, result: any, callback: () => void }) {
    return <>
        <h2 className='mt-2 mb-1 text-sm font-bold text-icePurp'>{info}</h2>
        <div className='flex'>
            <input placeholder={placeholder} type="text" value={value} onChange={(e) => { setValue(e.target.value) }} className='border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-l-lg p-2 w-[80%]' />
            <button className='bg-icePurp rounded-r-lg font-bold w-[20%] text-white' onClick={() => { callback() }} >Execute</button>
        </div>
        <div className='min-h-4 text-icePurp text-sm mt-1'>
            {result && <p>{result}</p>}
        </div>
    </>
}
