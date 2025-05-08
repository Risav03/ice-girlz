import React from 'react'
import { InputWithButton } from '../staking/stakingSettings'
import { contractSetup } from '@/utils/handlers/contractSetup';
import { ethers } from 'ethers';

export const TokenSettings = () => {

    const [receiver, setReceiver] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [sendRes, setSendRes] = React.useState<string>("");

    const [allowedMinter, setAllowedMinter] = React.useState<string>("");
    const [allowedRes, setAllowedRes] = React.useState<string>("");

    const [balanceCheck, setBalanceCheck] = React.useState<string>("");
    const [balanceRes, setBalanceRes] = React.useState<string>("");

    const [newOwner, setNewOwner] = React.useState<string>("");
    const [ownerRes, setOwnerRes] = React.useState<string>("");

    const [newMinter, setNewMinter] = React.useState<string>("");
    const [minterRes, setMinterRes] = React.useState<string>("");

    const [removeMinter, setRemoveMinter] = React.useState<string>("");
    const [removeRes, setRemoveRes] = React.useState<string>("");

    const [mintTo, setMintTo] = React.useState<string>("");
    const [mintAmount, setMintAmount] = React.useState<string>("");
    const [mintRes, setMintRes] = React.useState<string>("");

    const [burnAmount, setBurnAmount] = React.useState<string>("");
    const [burnRes, setBurnRes] = React.useState<string>("");


    async function sendFrost() {
        try {
            const contract = await contractSetup(0);
            const tx = await contract?.transfer(receiver, ethers.utils.parseEther(amount));

            await tx.wait().then((res: any) => {
                setSendRes("Done")
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async function addMinter() {
        try {
            const contract = await contractSetup(0);
            const tx = await contract?.addMinter(newMinter);

            await tx.wait().then((res: any) => {
                setMinterRes("Done")
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async function removeMinterFn() {
        try {
            const contract = await contractSetup(0);
            const tx = await contract?.removeMinter(removeMinter);
            await tx.wait().then((res: any) => {
                setRemoveRes("Done")
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async function mint(){
        try {
            const contract = await contractSetup(0);
            const tx = await contract?.mint(mintTo, ethers.utils.parseEther(mintAmount));

            await tx.wait().then((res: any) => {
                setMintRes("Done")
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async function transferOwnership(){
        try {
            const contract = await contractSetup(0);
            const tx = await contract?.transferOwnership(newOwner);

            await tx.wait().then((res: any) => {
                setOwnerRes("Done")
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async function checkMinter(){
        try {
            const contract = await contractSetup(0);
            const tx = await contract?.allowedMinters(allowedMinter);

            setAllowedRes(tx.toString());
        }
        catch (err) {
            console.log(err);
        }
    }

    async function checkBalance(){
        try {
            const contract = await contractSetup(0);
            const tx = await contract?.balanceOf(balanceCheck);

            setBalanceRes(ethers.utils.formatEther(tx));
        }
        catch (err) {
            console.log(err);
        }
    }

    async function burn(){
        try {
            const contract = await contractSetup(0);
            const tx = await contract?.burn(ethers.utils.parseEther(burnAmount));

            await tx.wait().then((res: any) => {
                setBurnRes("Done")
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='w-1/2'>
            <h2 className='text-lg font-bold text-icePurp'>Token Settings</h2>

            <h2 className='text-lg font-bold text-icePurp'>Read</h2>
            <InputWithButton placeholder='0x..' info='Check if Address is a minter' value={allowedMinter} setValue={setAllowedMinter} result={allowedRes} callback={checkMinter} />
            <InputWithButton placeholder='0x..' info='Check balance of address' value={balanceCheck} setValue={setBalanceCheck} result={balanceRes} callback={checkBalance} />


            <h2 className='text-lg font-bold text-icePurp'>Write</h2>

            <InputWithButton placeholder='Eg... 100' info='Amount to burn' value={burnAmount} setValue={setBurnAmount} result={burnRes} callback={burn} />



            <div className='flex-col mt-4 flex gap-2 border-[1px] border-icePurp/30 mb-4 p-2 rounded-lg'>
                <h2 className='text-sm font-bold text-icePurp'>Send $FROST</h2>

                <h2 className='text-xs font-bold text-icePurp'>Receiver Address</h2>
                <input placeholder="0x..." type="text" value={receiver} onChange={(e) => { setReceiver(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2 ' />

                <h2 className='text-xs font-bold text-icePurp'>Amount to send</h2>
                <input placeholder="Eg... 100" type="text" value={amount} onChange={(e) => { setAmount(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2' />

                <button className='bg-icePurp rounded-lg p-2 font-bold text-white' onClick={sendFrost}>Execute</button>

                <div className='min-h-4 text-icePurp text-sm mt-1'>
                    {sendRes && <p>{sendRes}</p>}
                </div>
            </div>

            <div className='flex-col mt-4 flex gap-2 border-[1px] border-icePurp/30 mb-4 p-2 rounded-lg'>
                <h2 className='text-sm font-bold text-icePurp'>Add Minter</h2>

                <h2 className='text-xs font-bold text-icePurp'>New Address</h2>
                <input placeholder="0x..." type="text" value={newMinter} onChange={(e) => { setNewMinter(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2 ' />

                {/* <h2 className='text-xs font-bold text-icePurp'>Amount to send</h2>
                <input placeholder="Eg... 100" type="text" value={amount} onChange={(e) => { setAmount(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2' /> */}

                <button className='bg-icePurp rounded-lg p-2 font-bold text-white' onClick={addMinter}>Execute</button>

                <div className='min-h-4 text-icePurp text-sm mt-1'>
                    {minterRes && <p>{minterRes}</p>}
                </div>
            </div>

            <div className='flex-col mt-4 flex gap-2 border-[1px] border-icePurp/30 mb-4 p-2 rounded-lg'>
                <h2 className='text-sm font-bold text-icePurp'>Remove Minter</h2>

                <h2 className='text-xs font-bold text-icePurp'>Address to remove</h2>
                <input placeholder="0x..." type="text" value={removeMinter} onChange={(e) => { setRemoveMinter(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2 ' />

                {/* <h2 className='text-xs font-bold text-icePurp'>Amount to send</h2>
                <input placeholder="Eg... 100" type="text" value={amount} onChange={(e) => { setAmount(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2' /> */}

                <button className='bg-icePurp rounded-lg p-2 font-bold text-white' onClick={removeMinterFn}>Execute</button>

                <div className='min-h-4 text-icePurp text-sm mt-1'>
                    {removeRes && <p>{removeRes}</p>}
                </div>
            </div>

            <div className='flex-col mt-4 flex gap-2 border-[1px] border-icePurp/30 mb-4 p-2 rounded-lg'>
                <h2 className='text-sm font-bold text-icePurp'>Mint</h2>

                <h2 className='text-xs font-bold text-icePurp'>Address to mint to</h2>
                <input placeholder="0x..." type="text" value={mintTo} onChange={(e) => { setMintTo(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2 ' />

                <h2 className='text-xs font-bold text-icePurp'>Amount to mint</h2>
                <input placeholder="Eg... 100" type="text" value={mintAmount} onChange={(e) => { setMintAmount(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2' />

                <button className='bg-icePurp rounded-lg p-2 font-bold text-white' onClick={mint}>Mint</button>

                <div className='min-h-4 text-icePurp text-sm mt-1'>
                    {mintRes && <p>{mintRes}</p>}
                </div>
            </div>

            <div className='flex-col mt-4 flex gap-2 border-[1px] border-icePurp/30 mb-4 p-2 rounded-lg'>
                <h2 className='text-sm font-bold text-icePurp'>Transfer Ownership</h2>

                <h2 className='text-xs font-bold text-icePurp'>New Owner</h2>
                <input placeholder="0x..." type="text" value={newOwner} onChange={(e) => { setNewOwner(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2 ' />

                {/* <h2 className='text-xs font-bold text-icePurp'>Amount to send</h2>
                <input placeholder="Eg... 100" type="text" value={amount} onChange={(e) => { setAmount(e.target.value) }} className='w-full border-[1px] placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2' /> */}

                <button className='bg-icePurp rounded-lg p-2 font-bold text-white' onClick={transferOwnership}>Execute</button>

                <div className='min-h-4 text-icePurp text-sm mt-1'>
                    {ownerRes && <p>{ownerRes}</p>}
                </div>
            </div>

        </div>
    )
}
