import Background from "@/components/UI/background";
import Navbar from "@/components/UI/navbar";

export default function Home({params}:{params:{index:string}}) {
  return (
    <div className="max-h-screen overflow-hidden">
      <Background/>
      <Navbar/>
    
    </div>
  );
}