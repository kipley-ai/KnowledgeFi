"use client";
import { useEffect, useState } from "react";

type SwitcherProps = {
  texts: string[];
  mode: number;
  setWhich: any;
  fullWidth?: boolean;
  bg?: string;
};

const Switcher = ({
  texts = [],
  mode,
  setWhich,
  fullWidth = false,
  bg = "bg-stone-700",
}: SwitcherProps) => {
  return (
    <div
      className={`${!fullWidth ? "max-w-[501px]" : ""} rounded-md border border-stone-600 ${bg} md:h-10 md:p-1`}
    >
      <div className="relative flex w-full flex-row items-center">
        {texts.map((text, index) => (
          <div
            key={index}
            className={`z-10 cursor-pointer rounded-sm py-1 w-1/${texts.length}`}
          >
            <h1
              onClick={() => setWhich(index)}
              className={`text-center text-xs font-semibold text-black text-neutral-500 lg:text-sm`}
            >
              {text}
            </h1>
          </div>
        ))}
        {/* <span aria-hidden="true" className={`${mode== 1 ? "left-[20%]":mode === 2 ? "left-[40%]" : mode === 3 ? "left-[60%]" : mode === 4 ? "left-[80%]" : "left-0"} absolute h-full w-1/5 bg-stone-600 transition-all rounded-lg`}></span> */}
        {/* <span aria-hidden="true" className={`${mode== 1 ? "left-[50%]": "left-0"} absolute h-full w-1/2 bg-stone-600 transition-all rounded-lg`}></span> */}
        <span
          aria-hidden="true"
          className={`${mode != 0 ? `left-[${(mode * 100) / texts.length}%]` : "left-0"} absolute h-full w-1/${texts.length} rounded-lg bg-[#303030] transition-all`}
        ></span>
      </div>
      {/* <div className="flex flex-row flex-wrap w-full relative">
                <div className={`rounded-sm cursor-pointer z-10 py-1 w-1/5`}>
                    <h1 onClick={()=>setWhich(0)}>{texts[0]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 w-1/5`}>
                    <h1 onClick={()=>setWhich(1)}>{texts[1]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 w-1/5`}>
                    <h1 onClick={()=>setWhich(2)}>{texts[2]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 w-1/5`}>
                    <h1 onClick={()=>setWhich(3)}>{texts[3]}</h1>
                </div>
                <div className={`rounded-sm cursor-pointer z-10 py-1 w-1/5`}>
                    <h1 onClick={()=>setWhich(4)}>{texts[4]}</h1>
                </div>                
                <span aria-hidden="true" className={`${mode== 1 ? "left-[20%]":mode === 2 ? "left-[40%]" : mode === 3 ? "left-[60%]" : mode === 4 ? "left-[80%]" : "left-0"} absolute h-full w-1/5 bg-stone-600 transition-all rounded-lg`}></span>
            </div> */}
    </div>
  );
};

export default Switcher;
