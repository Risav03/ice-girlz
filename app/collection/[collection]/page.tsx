import { StakeHolder } from "@/components/staking/stakeHolder";
import Background from "@/components/UI/background";
import Navbar from "@/components/UI/navbar";
import { WalletConnectButton } from "@/components/walletConnectButton";
import { fetchFrostBal } from "@/utils/handlers/fetchFrostBal";
import Image from "next/image";
import { useAccount } from "wagmi";

export default function Home({params}:{params:{collection:string}}) {

  return (
    <div className="max-h-screen overflow-hidden">
      <Background/>
      <Navbar/>
      {/* @ts-ignore */}
      <StakeHolder collection={params.collection.toLowerCase()} />
    </div>
  );
}
