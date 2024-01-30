"use client"
import nft1 from "@/public/images/nft-1.png"
import Image from "next/image"
import user_avatar from "@/public/images/user-28-01.jpg"
import keyboard from "@/public/images/applications-image-23.jpg"
import { useAppProvider } from "@/providers/app-provider"
import { useEffect } from "react"
import link_nft_chatbot from "@/public/images/link-nft-chatbot.png"
import { useCallback, useState } from 'react'
import { useNftDetail } from "@/hooks/api/nft"
import { useChatbotDetail } from "@/hooks/api/chatbot"
import { useParams } from "next/navigation"
import Link from "next/link"
  
const NFTSection = ({nftDetail}:{nftDetail:any})=> {
    return(<div className="grid grid-cols-2 gap-[30px] text-white  pb-[50px]">
        <div>
            <Image src={nft1} alt={"nft image"}/>
        </div>
        <div>
            <h1 className="text-4xl font-bold">{nftDetail.name}</h1>
            <h4 className="text-[#01F7FF]">Token ID: 9501234</h4>
            <p className="my-[50px]">OpenAI has created a model that surpasses ChatGPT in several areas, like math and physics equations, creative writing, and other difficult tasks. </p>
            <div className="flex mb-[50px]">
            <Image
             className="rounded-full"
             src={user_avatar}
             alt={"creator image"}
            />
            <div className="">
                <h2 className="text-[#93989A]">Creator</h2> 
                <h1>Omsx75168412..357879</h1>
            </div>
            </div>
            <h4 className="text-[#93989A] mb-5">Current Stored Value</h4>
            <h1 className="font-semibold">3.89 KIP</h1>
        </div>
    </div>)

}

const ChatbotSection = ({chatbotDetail}:{chatbotDetail:any}) => {
    return (<div className="grid grid-cols-2 gap-x-[30px] gap-y-5 text-white mt-5 py-[50px] border-t border-[#474D54]">
        <div className="col-span-2 flex justify-between  items-center">
            <div className="flex items-center">
                <Image
                className="mr-5 object-cover rounded-lg w-[80px] h-[80px]"
                width={80}
                height={80}
                src={keyboard}
                alt={"chatbot image"}
                />
                <h1 className="text-4xl font-semibold">{chatbotDetail.name}</h1>
            </div>
            <div>
                <button className="rounded-full border border-[#01F7FF] text-[#01F7FF] flex px-7 py-1 items-center"> 
                <svg className="mr-1" width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4274 0.513214L9.10264 1.83799L12.6609 5.39627L13.9857 4.07149C14.67 3.38721 14.67 2.27867 13.9857 1.59438L12.9073 0.513214C12.223 -0.171071 11.1144 -0.171071 10.4302 0.513214H10.4274ZM8.48405 2.45658L2.10377 8.83959C1.81911 9.12425 1.61109 9.47735 1.49613 9.86328L0.527182 13.1561C0.458753 13.3887 0.521707 13.6378 0.69141 13.8075C0.861113 13.9772 1.11019 14.0402 1.34011 13.9745L4.63289 13.0055C5.01883 12.8906 5.37192 12.6825 5.65658 12.3979L12.0423 6.01486L8.48405 2.45658Z" fill="#01F7FF"/>
                </svg>
                    Edit
                </button>
            </div>

        </div>
        <div className="col-span-1 text-[#FCFCFC]">
            <p className="mb-[50px] font-medium">OpenAI has created a model that surpasses ChatGPT in several areas, like math and physics equations, creative writing, and other difficult tasks. </p>
            <div className="grid grid-cols-1 gap-3 text-[#FCFCFC] mb-[20px]">
                <div className="flex justify-between pb-4 border-b border-[#393E44]">
                    <p className="text-[#7C878E] font-semibold">Date Created</p>
                    <p className="font-semibold">Colorful Keyboard</p>
                </div>
                <div className="flex justify-between pb-4 border-b border-[#393E44]">
                    <p className="text-[#7C878E]  font-semibold">Category</p>
                    <p className="font-semibold">Production</p>
                </div>
                <div className="flex justify-between pb-4 border-b border-[#393E44]">
                    <p className="text-[#7C878E]  font-semibold">Creator</p>
                    <p className="font-semibold">0msx235876980</p>
                </div>
            </div>
            <p className="text-[#7C878E] mb-4 mt-[30px] font-semibold">Prompt</p>
            <p className="font-medium">Talk to customer to see if you can help</p>
        </div>
        <div className="col-span-1 bg-[#1A1D1F] rounded-2xl p-12 " >
            <h1 className="mb-8 font-semibold text-lg">KB Info</h1>
            <div className="grid grid-cols-1 gap-3 text-[#FCFCFC]">
            <div className="flex justify-between pb-4 border-b border-[#202326]">
                <p className="text-[#6F767E] font-semibold">Name</p>
                <p className="font-medium">Colorful Keyboard</p>
            </div>
            <div className="flex justify-between pb-4 border-b border-[#202326]">
                <p className="text-[#6F767E] font-semibold">Description</p>
                <p className="font-medium">Download link is broken</p>
            </div>
            <div className="flex justify-between pb-4 border-b border-[#222528]">
                <p className="text-[#6F767E]">Category</p>
                <div className="bg-[#B5E4CA]"><p className="text-[#1A1D1F]">AI</p></div>
            </div>
            <div className="flex justify-between pb-4 border-b border-[#222528]">
                <p className="text-[#6F767E]">Transaction date</p>
                <p className="font-medium">July 01,1970</p>
            </div>
            <div className="flex justify-between pb-4 border-b border-[#222528]">
                <p className="text-[#6F767E]">Transaction code</p>
                <p className="font-medium">128938-abcd-123456</p>
            </div>
            <div className="flex justify-between pb-4 border-b border-[#222528]">
                <p className="text-[#6F767E]">Transaction ID</p>
                <p className="font-medium">128938-abcd-123456</p>
            </div>
            <div className="flex justify-between pb-4 border-b border-[#222528]">
                <p className="text-[#6F767E]">Market fee</p>
                <p className="font-medium">$7.29</p>
            </div>
            <div className="flex justify-between pb-4 border-b border-[#202326]">
                <p className="text-[#6F767E]">Price</p>
                <p className="font-medium">$72.99</p>
            </div>
            </div>
        </div>
    </div>)
}

const NoNFT = () => {
    return (
        <div className="h-full" >
    <div className="relative  w-full bg-[#151515] rounded-3xl">
        <Image  className=" w-full rounded-3xl" src={link_nft_chatbot} alt={"background"}/>
        <div className="flex items-center flex-col" style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <h1 className="text-[48px] font-semibold text-white mb-[2px]">Unlock the power of Web3</h1>
            <h1 className="text-[18px] font-regular text-white mb-[30px]">Meet our ai chat app revolutionizing conversations</h1>
            <h1 className="text-[#292D32] font-semibold bg-[#01F7FF] rounded-full py-3 px-8 w-fit">Mint your NFT</h1>
        </div>
    </div>
    
    </div>
    )
}

const NoChatbot = () => {
    // const [imageRef, { width:imageWidth, height:imageHeight }] = useElementSize()
    // const [containerRef, { width:containerWidth, height:containerHeight }] = useElementSize()
    const {id} = useParams()
    return (
    <div className="h-full" >
    <div className="relative  w-full bg-[#151515] rounded-3xl">
        <Image  className=" w-full rounded-3xl" src={link_nft_chatbot} alt={"background"}/>
        <div className="flex items-center flex-col" style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            <h1 className="text-[48px] font-extrabold text-white mb-[30px]">Connect with AI Chat Bot</h1>
            <Link href={"/nft/"+id+"/create-chatbot"}>
            <h1 className="text-[#292D32] font-semibold bg-[#01F7FF] rounded-full py-3 px-8 w-fit">Link Your NFT to Chatbot</h1>
            </Link>
        </div>
    </div>
    
    </div>
    )
}

const NFTDetail = ({params}:{params:any}) => {
    
    const {setHeaderTitle} = useAppProvider()
    useEffect(()=> {
        setHeaderTitle("My NFT")
    },[])
    const [nft,setNft] = useState(true)
    const [chatbot,setChatbot] = useState(true)
    const { id } = params; 

    const {data:nftData} = useNftDetail({ sft_id:id})
    const {data:chatbotData} = useChatbotDetail({chatbot_id:nftData?.data.data.chatbot_id})
    
    return (
        <div className="p-12 bg-[#292D32]">
        {
            nftData?
            <NFTSection nftDetail={nftData?.data.data}/>:
            <NoNFT/>
        }
        {
            nftData?.data.data.chatbot_id && chatbotData ?
            <ChatbotSection chatbotDetail={chatbotData?.data.data}/>
            :<NoChatbot/>
        }
        
        
        </div>
    )
    
}
export default NFTDetail;
