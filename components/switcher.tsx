'use client'
import { useEffect, useState } from "react";
 
const Switcher = ({texts=[],setWhich}:{texts : string[],setWhich: any}) => {
    const [mode,setMode] = useState(0)

    useEffect(()=> {
        setWhich(mode)
    },[mode])
    return ( 
        <div className="bg-stone-700 w-[501px]  h-10 border border-stone-600 rounded-xl p-1">
            <div className="flex flex-row w-full relative">
                <div className={`rounded-sm cursor-pointer z-10 py-1 px-4 w-1/5`}>
                    <h1 onClick={()=>setMode(0)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{texts[0]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 px-4 w-1/5`}>
                    <h1 onClick={()=>setMode(1)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{texts[1]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 px-4 w-1/5`}>
                    <h1 onClick={()=>setMode(2)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{texts[2]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 px-4 w-1/5`}>
                    <h1 onClick={()=>setMode(3)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{texts[3]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 px-4 w-1/5`}>
                    <h1 onClick={()=>setMode(4)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{texts[4]}</h1>
                </div>                
                <span aria-hidden="true" className={`${mode== 1 ? "left-[20%]":mode === 2 ? "left-[40%]" : mode === 3 ? "left-[60%]" : mode === 4 ? "left-[80%]" : "left-0"} absolute h-full w-1/5 bg-stone-600 transition-all rounded-lg`}></span>
            </div>
        </div>
     );
}
 
export default Switcher;