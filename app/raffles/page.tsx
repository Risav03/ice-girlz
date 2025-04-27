'use client'
import { EndedRaffleCard } from "@/components/raffles/endedRaffleCard";
import { RaffleHolder } from "@/components/raffles/raffleHolder";
import Background from "@/components/UI/background";
import Navbar from "@/components/UI/navbar";
import { setERC721Contract } from "@/utils/handlers/contractSetup";
import { getAllRaffles, getEndedRaffles } from "@/utils/handlers/getAllRaffles";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {

    const [active, setActive] = useState<any>([])
    const [ended, setEnded] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false);

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

                {ended.length > 0 && (
                    <div className="fixed bottom-0 pt-2 left-0 w-full h-20 border-t-[1px] border-icePurp bg-white rounded-t-2xl">
                        <div className="w-full h-full overflow-x-auto">
                            <div className="flex items-center min-w-full px-2">
                                <h1 className="text-icePurp text-xl font-bold whitespace-nowrap mr-4">Past Raffles</h1>
                                <div className="flex gap-4 px-4 whitespace-nowrap">
                                    {ended.map((raffle: any, i: number) => (
                                        raffle && <EndedRaffleCard key={i} values={raffle} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}