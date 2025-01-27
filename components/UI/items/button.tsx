import { ReactNode } from "react";

export default function Button({children, selected, onClick}:{children:string, selected:string, onClick?:()=>{}}){
    return(
        <button onClick={onClick} className={`border-[1px] min-w-32 h-10 rounded-full border-icePurp ${children.toUpperCase() === selected.toUpperCase() ? "bg-icePurp text-white" : "bg-white text-icePurp"} hover:-translate-y-1 duration-200 font-bold py-2 px-4 `}>
            {children}
        </button>
    )

}