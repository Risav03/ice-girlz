'use client'
import { EndedRaffleCard } from "@/components/raffles/endedRaffleCard";
import { MyTicketsCard } from "@/components/raffles/myTicketsCard";
import { RaffleHolder } from "@/components/raffles/raffleHolder";
import Background from "@/components/UI/background";
import Button from "@/components/UI/items/button";
import Navbar from "@/components/UI/navbar";
import { setERC721Contract } from "@/utils/handlers/contractSetup";
import { getAllRaffles, getEndedRaffles, yourTickets } from "@/utils/handlers/getAllRaffles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";

export default function Home() {

    const {address} = useAccount()

    const [active, setActive] = useState<any>([])
    const [ended, setEnded] = useState<any>([])

    const [myTickets, setMyTickets] = useState<any>([])

    const [loading, setLoading] = useState<boolean>(false);

    const [selected, setSelected] = useState<string>("past");

    async function fetchRaffles() {
        try {
            setLoading(true);
            const raffles = await getAllRaffles();

            const res = raffles.map(async (raffle: any) => {
                const contract = await setERC721Contract(raffle.contractAddress);
                const name = await contract?.name();
                return { ...raffle, name }
            })

            await Promise.all(res).then((values) => {
                console.log(values);
                setActive(values);
            }).catch((err) => {
                console.log(err);
            })
        }

        catch (err) {
            toast.error("Error fetching raffles");
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    async function endedRaffles() {
        try {
            const ended = await getEndedRaffles();

            const res = ended.map(async (raffle: any) => {
                console.log(raffle.contractAddress.slice(3, 8));
                if (raffle.contractAddress.toUpperCase() !== "0X0000000000000000000000000000000000000000") {
                    console.log(raffle.contractAddress);
                    const contract = await setERC721Contract(raffle.contractAddress);
                    const name = await contract?.name();
                    return { ...raffle, name }
                }
                else {
                    return null
                }
            })

            await Promise.all(res).then((values) => {
                console.log(values);
                setEnded(values);
            }).catch((err) => {
                console.log(err);
            })
        }
        catch (err) {
            toast.error("Error fetching ended raffles");
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    async function getMyTickets(){
        try{
            const res = await yourTickets(address as `0x${string}`);

            const response = res.map(async (raffle: any) => {
                const contract = await setERC721Contract(raffle.contractAddress);
                const name = await contract?.name();
                return { ...raffle, name }
            })

            await Promise.all(response).then((values) => {
                console.log(values);
                setMyTickets(values);
            }).catch((err) => {
                console.log(err);
            })

        }
        catch(err){
            toast.error("Error fetching your tickets");
            console.log(err);
        }
    }

    useEffect(()=>{
        if(address){
            getMyTickets();
        }
    },[address])



    useEffect(() => {
        fetchRaffles();
        endedRaffles()
    }, [])


    return (
        <>
            <div className="min-h-screen w-screen flex-col md:px-10 max-md:px-2 py-20 flex items-center justify-center">
                <Background />
                <Navbar />
                <div className="border-[1px] max-md:hidden border-icePurp rounded-2xl md:w-[70vw] md:min-w-[700px] h-20 text-3xl font-bold text-icePurp flex items-center justify-start px-8 bg-white">
                    <h1>RAFFLES</h1>
                </div>
                <RaffleHolder loading={loading} raffles={active} />

                        <div className="max-md:w-screen fixed bottom-20 left-0">
                            <button onClick={()=>{setSelected("past")}} className={`md:w-32 max-md:w-1/2 ${selected == "past" ? "bg-icePurp text-white" : "bg-white text-icePurp"} py-2 md:border-r-[1px] md:border-t-[1px] border-icePurp font-bold duration-200 `}>Past Raffles</button>
                            <button onClick={()=>{setSelected("my")}} className={`md:w-32 max-md:w-1/2 ${selected == "my" ? "bg-icePurp text-white" : "bg-white text-icePurp"} py-2 md:border-r-[1px] md:border-t-[1px] border-icePurp md:rounded-tr-xl font-bold duration-200 `}>My Tickets</button>
                        </div>
                {/* {selected == "past" && ( */}
                    <div className="fixed bottom-0 pt-2 left-0 w-full h-20 border-t-[1px] border-icePurp bg-white">


                        <div className="w-full h-full overflow-x-auto">
                            <div className="flex items-center min-w-full px-2">
                                <div className="flex gap-4 whitespace-nowrap">
                                    {selected == "past" ?<>
                                    {ended.length > 0 ? <>
                                        {ended?.map((raffle: any, i: number) => (
                                            raffle && <EndedRaffleCard key={i} values={raffle} />
                                        ))}
                                    </> : <h2 className="text-icePurp w-screen text-center mt-4">Nothing to show here!</h2>}
                                    </> : 
                                    <>
                                        {myTickets.length > 0 ? <>
                                            {myTickets?.map((ticket: any, i: number) => (
                                                <MyTicketsCard key={i} values={ticket} />
                                            ))}
                                        </> : <h2 className="text-icePurp w-screen text-center mt-4">Nothing to show here!</h2>}
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                {/* )} */}

                {

                }
            </div>
        </>
    )
}