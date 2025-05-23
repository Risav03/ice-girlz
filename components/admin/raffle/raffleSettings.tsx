'use client'
import { contractAdds } from '@/utils/contractAdds';
import { contractSetup, setERC721Contract } from '@/utils/handlers/contractSetup';
import { getAllRaffles } from '@/utils/handlers/getAllRaffles';
import axios from 'axios';
import { ethers } from 'ethers';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { RiLoader5Fill } from 'react-icons/ri';
import { AdminRaffleCards } from './adminRaffleCards';
import { toast } from 'react-toastify';

export const RaffleSettings = () => {

    const raffleAdd = contractAdds.raffles;

    const [newAdmin, setNewAdmin] = React.useState<string>("");
    const [newAdminLoading, setNewAdminLoading] = React.useState<boolean>(false);

    const [newReceiver, setNewReceiver] = React.useState<string>("");
    const [newReceiverLoading, setNewReceiverLoading] = React.useState<boolean>(false);


    const [limitPerWallet, setLimitPerWallet] = React.useState<string>("0");
    const [allowedTickets, setAllowedTickets] = React.useState<string>("0");
    const [cost, setCost] = React.useState<string>("");
    const [link, setLink] = React.useState<string>("");
    const [profileImg, setProfileImg] = React.useState<File | string | null>(null);

    const [loading, setLoading] = React.useState<boolean>(false);

    const [endTime, setEndTime] = React.useState<string>("")

    const [index, setIndex] = React.useState<number>(0);
    const [values, setValues] = React.useState<any>([])

    async function fetchRaffles() {
        try {
            const contract = await contractSetup(4);

            const active = await contract?.activeRaffles();
            const owner = await contract?.owner()
            const receiver = await contract?.fundReceiver()
            setNewAdmin(owner);
            setNewReceiver(receiver);
            setIndex(active.toNumber());

            const raffles = await getAllRaffles();

            const res = raffles.map(async(raffle: any) => {
                const contract = await setERC721Contract(raffle.contractAddress);
                const name = await contract?.name();
                return {...raffle, name}
            })
    
            await Promise.all(res).then((values) => {

                setValues(values);
            }).catch((err) => {
                console.log(err);
            })

        }
        catch (e) {

            console.error("This is error: ", e);
        }
    }

    useEffect(() => {
        fetchRaffles();
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProfileImg(e.target.files[0]);
        }
    }
    const handleSubmit = async () => {
        try {
            const contractAdd = link.split("/")[link.split("/").length - 2];
            const tokenId = link.split("/")[link.split("/").length - 1];

            setLoading(true);

            const approve = await approval(contractAdd);

            if (approve) {
                const formData = new FormData();
                formData.append('profileImage', profileImg as Blob);
                formData.append('ca', contractAdd);
                formData.append('tokenId', tokenId);
                const response = await axios.post('/api/uploadToS3', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                );

                console.log(response);

                if (response.status == 200) {
                    const contract = await contractSetup(4);

                    console.log("Contract", contract)

                    const tx = await contract?.setRaffleItem(
                        index,
                        contractAdd,
                        limitPerWallet,
                        link,
                        tokenId,
                        allowedTickets,
                        ethers.utils.parseEther(cost),
                        endTime
                    );
                    await tx.wait().then((res: any) => {
                        console.log(res);
                        alert("Raffle Created Successfully");
                        window.location.reload()
                    });
                }

            }
        }
        catch (e) {
            console.error("This is error: ", e);
            // Handle the error as needed
            toast.error("Error creating raffle");
        }
        finally {
            setLoading(false);
        }

    }

    async function approval(address: string) {

        try {
            const contract = await setERC721Contract(address);
            const tokenId = link.split("/")[link.split("/").length - 1];

            const approval = await contract?.approve(raffleAdd, tokenId);

            await approval.wait()

            return true;
        }
        catch (err) {
            console.log("Error", err)
            setLoading(false);

        }

    }

    async function resetAdmin(){
        try{
            setNewAdminLoading(true);
            const contract = await contractSetup(4);
            const tx = await contract?.transferOwnership(newAdmin);

            await tx.wait().then(()=>{
                alert("Admin Reset Successfully");
                window.location.reload();
            })
        }
        catch(err){
            console.log(err);
            toast.error("Error resetting admin");
        }
        finally{
            setNewAdminLoading(false);
        }
    }

    async function resetReceiver(){
        try{
            setNewReceiverLoading(true);
            const contract = await contractSetup(4);
            const tx = await contract?.setFundReceiver(newReceiver);

            await tx.wait().then(()=>{
                alert("Fund Receiver Reset Successfully");
                window.location.reload();
            })
        }
        catch(err){
            console.log(err);
            toast.error("Error resetting admin");
        }
        finally{
            setNewReceiverLoading(false);
        }
    }

    return (<>
    <div className='w-full'>
                        <h3 className='text-icePurp text-base font-bold'>New Admin Wallet </h3>
                        <input placeholder='Type 0 for no limit' onChange={(e) => { setNewAdmin(e.target.value) }} value={newAdmin} type="text" className='px-4 outline-none h-12 w-full rounded-lg bg-white text-lg border-2 text-icePurp placeholder-icePurp/30 border-icePurp' />
                        <button className='w-20 font-bold text-white bg-icePurp py-2 rounded-lg mt-2' onClick={resetAdmin} >{newAdminLoading ? <RiLoader5Fill className='animate-spin mx-auto' /> : "Set"}</button>
                    </div>
                    <div className='w-full mt-2'>
                        <h3 className='text-icePurp text-base font-bold'>New Receiver Wallet </h3>
                        <input placeholder='Type 0 for no limit' onChange={(e) => { setNewReceiver(e.target.value) }} value={newReceiver} type="text" className='px-4 outline-none h-12 w-full rounded-lg bg-white text-lg border-2 text-icePurp placeholder-icePurp/30 border-icePurp' />
                        <button className='w-20 font-bold text-white bg-icePurp py-2 rounded-lg mt-2' onClick={resetReceiver} >{newReceiverLoading ? <RiLoader5Fill className='animate-spin mx-auto' /> : "Set"}</button>

                    </div>
        <div className='flex gap-4 h-full w-full'>
            
            <div className='w-1/2'>
                <h2 className='text-lg font-bold text-icePurp'>Create</h2>
                <div className='flex flex-col justify-center items-center w-full gap-5'>

                    <div className='w-full'>
                        <h3 className='text-icePurp text-base font-bold'>Limit Per Wallet <span className='text-xs'>(keep 0 for no limit)</span></h3>
                        <input placeholder='Type 0 for no limit' onChange={(e) => { setLimitPerWallet(e.target.value) }} value={limitPerWallet} type="text" className='px-4 outline-none h-12 w-full rounded-lg bg-white text-lg border-2 text-icePurp placeholder-icePurp/30 border-icePurp' />
                    </div>

                    <div className='w-full'>
                        <h3 className='text-icePurp text-base font-bold'>Total Allowed Tickets <span className='text-xs'>(keep 0 for no limit)</span></h3>
                        <input placeholder='Type 0 for no limit' onChange={(e) => { setAllowedTickets(e.target.value) }} value={allowedTickets} type="text" className='px-4 outline-none h-12 w-full rounded-lg bg-white text-lg border-2 text-icePurp placeholder-icePurp/30 border-icePurp' />
                    </div>

                    <div className='w-full'>
                        <h3 className='text-icePurp text-base font-bold'>Cost per Ticket</h3>
                        <div className='border-2 border-icePurp rounded-lg flex items-center justify-between'>
                            <input onChange={(e) => { setCost(e.target.value) }} value={cost} type="text" className='px-4 h-12 w-full outline-none rounded-lg bg-white text-lg text-icePurp placeholder-icePurp/30 border-icePurp' />
                        </div>
                    </div>

                    <div className='w-full'>
                        <h3 className='text-icePurp text-base font-bold'>NFT Opensea Link</h3>
                        <input onChange={(e) => { setLink(e.target.value) }} value={link} type="text" className='px-4 h-12 w-full rounded-lg bg-white text-lg border-2 outline-none text-icePurp placeholder-icePurp/30 border-icePurp' />
                    </div>
                    <div className='flex gap-2 w-full items-start'>
                        <div className='w-1/2'>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-60 aspect-square border-2 text-icePurp placeholder-icePurp/30 border-icePurp/30 border-dashed rounded-full cursor-pointer hover:bg-jel-gray-1">
                                <div className="flex flex-col items-center h-full w-full p-2 overflow-hidden justify-center rounded-lg">
                                    {!profileImg ? <svg className="w-8 h-8 text-jel-gray-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg> :
                                        <Image alt="hello" className='w-full h-full object-cover rounded-full hover:scale-110 hover:opacity-30 duration-300' width={1000} height={1000} src={!profileImg ? "" : (profileImg instanceof File ? URL.createObjectURL(profileImg) : profileImg)} />}
                                </div>
                                <input id="dropzone-file" type="file" accept='image/*' onChange={handleFileChange} className="hidden" />
                            </label>
                        </div>
                        <div className='w-1/2'>
                            <h3 className='text-icePurp text-base font-bold'>End Date</h3>
                            <input type='date' onChange={(e) => { setEndTime(String(((new Date(e.target.value)).getTime()) / 1000)) }} className='w-full border-2 placeholder-icePurp/40 text-icePurp border-icePurp rounded-lg p-2'></input>
                        </div>
                    </div>
                </div>

                <button onClick={handleSubmit} className='bg-icePurp text-white px-4 py-2 rounded-lg mt-5'>{loading ? <RiLoader5Fill className='animate-spin mx-auto' /> : "Create"}</button>
            </div>
            <div className='w-1/2 border-l-[1px] pl-4'>
                <h2 className='text-lg font-bold text-icePurp'>Manage</h2>
                <div className='flex flex-wrap gap-1'>
                    {values.map((raffle: any, i: number) => (
                        <div className=''>
                            <AdminRaffleCards values={raffle} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
    )
}
