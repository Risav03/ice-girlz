import bg1 from "@/assets/bg/ice-girlz.svg";
import Image from "next/image";

export default function Background(){
    return(
        <div className="w-full h-full object-cover fixed top-0 left-0 z-[-1]">
            <Image src={bg1} alt="background" className="h-screen object-cover w-[120vw]"/>
        </div>
    )
}