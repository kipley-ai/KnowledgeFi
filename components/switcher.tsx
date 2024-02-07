'use client'
import { useEffect, useState } from "react";

type SwitcherProps = {
  texts: string[];
  mode: number;
  setWhich: any;
};
 
const Switcher = ({ texts = [], mode, setWhich }: SwitcherProps) => {
    return ( 
        <div className="bg-stone-700 max-w-[501px]  h-10 border border-stone-600 rounded-xl p-1">
            <div className="flex flex-row flex-wrap w-full relative">
                {texts.map((text, index) => (
                    <div key={index} className={`rounded-sm cursor-pointer z-10 py-1 w-1/${texts.length}`}>
                        <h1 onClick={() => setWhich(index)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{text}</h1>
                    </div>
                ))}
                {/* <span aria-hidden="true" className={`${mode== 1 ? "left-[20%]":mode === 2 ? "left-[40%]" : mode === 3 ? "left-[60%]" : mode === 4 ? "left-[80%]" : "left-0"} absolute h-full w-1/5 bg-stone-600 transition-all rounded-lg`}></span> */}
                {/* <span aria-hidden="true" className={`${mode== 1 ? "left-[50%]": "left-0"} absolute h-full w-1/2 bg-stone-600 transition-all rounded-lg`}></span> */}
                <span aria-hidden="true" className={`${mode!=0 ? `left-[${mode*100/texts.length}%]` : "left-0"} absolute h-full w-1/${texts.length} bg-stone-600 transition-all rounded-lg`}></span>
            </div>
            {/* <div className="flex flex-row flex-wrap w-full relative">
                <div className={`rounded-sm cursor-pointer z-10 py-1 w-1/5`}>
                    <h1 onClick={()=>setWhich(0)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{texts[0]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 w-1/5`}>
                    <h1 onClick={()=>setWhich(1)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{texts[1]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 w-1/5`}>
                    <h1 onClick={()=>setWhich(2)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{texts[2]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 w-1/5`}>
                    <h1 onClick={()=>setWhich(3)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{texts[3]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 w-1/5`}>
                    <h1 onClick={()=>setWhich(4)} className={`text-neutral-500 font-semibold text-black text-center text-sm`}>{texts[4]}</h1>
                </div>                
                <span aria-hidden="true" className={`${mode== 1 ? "left-[20%]":mode === 2 ? "left-[40%]" : mode === 3 ? "left-[60%]" : mode === 4 ? "left-[80%]" : "left-0"} absolute h-full w-1/5 bg-stone-600 transition-all rounded-lg`}></span>
            </div> */}
        </div>
     );
}
 
export default Switcher;