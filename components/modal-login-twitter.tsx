import ModalBasic from "@/components/modal-basic";
import ModalBlank from "@/components/modal-blank-2";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
// import fbLogo from '@/public/images/icon-facebook.svg'
import twtLogo from '@/public/images/logo-twitter.svg'
// import emailLogo from '@/public/images/icon-linkedin.svg'
import { useAppProvider } from "@/app/app-provider";

export default function ModalLoginTwitter({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: any;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [urlShare,setUrlShare] = useState("")
    const pathname = usePathname()
    

    useEffect(() => {
        // console.log(window.location.href);
        // urlRef.current = window.location.href;
        setUrlShare(window.location.href)
    }, []);

    
    return (
        <ModalBlank isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="p-5">
            <div className="mt-6 pb-4 mb-6 ">
                <div className="flex justify-between  w-full">
                    <h1 className="text-3xl font-semibold text-[#FCFCFD]">
                        Sign to continue
                    </h1>
                    <button className="text-[#FCFCFD] dark:text-slate-500 hover:text-slate-500 dark:hover:text-slate-400" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>
                    <div className="sr-only">Close</div>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="38" height="38" rx="19" stroke="#E6E8EC" stroke-width="2"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L20 18.5858L25.2929 13.2929C25.6834 12.9024 26.3166 12.9024 26.7071 13.2929C27.0976 13.6834 27.0976 14.3166 26.7071 14.7071L21.4142 20L26.7071 25.2929C27.0976 25.6834 27.0976 26.3166 26.7071 26.7071C26.3166 27.0976 25.6834 27.0976 25.2929 26.7071L20 21.4142L14.7071 26.7071C14.3166 27.0976 13.6834 27.0976 13.2929 26.7071C12.9024 26.3166 12.9024 25.6834 13.2929 25.2929L18.5858 20L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z" fill="#FCFCFD"/>
                    </svg>
                    </button>
                </div>
            </div>
            <div className="flex w-full items-center justify-around mx-auto mb-6">
                {/* <div className=" rounded-full mr-2 cursor-pointer">
                <Image className=" border-slate-200" src={fbLogo} width={"40"} height={"40"} alt="facebook logo"/>
                </div> */}
                <div className="flex w-full p-3 items-center justify-center  rounded-full bg-white cursor-pointer">
                    <div className=" rounded-full mr-2 cursor-pointer">
                    <Image className=" border-slate-200" src={twtLogo} width={"40"} height={"40"} alt="twitter logo"/>
                    </div>
                    <p className="uppercase ml-5 font-black">Connect X</p>
                </div>
                {/* <div className=" rounded-full cursor-pointer">
                <Image className=" border-slate-200" src={emailLogo} width={"40"} height={"40"} alt="twitter logo"/>
                </div> */}
            </div>
            </div>
        </ModalBlank>
    )
}