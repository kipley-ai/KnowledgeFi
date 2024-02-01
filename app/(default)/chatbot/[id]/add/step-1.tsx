"use client"
import XIcon from "public/images/X-icon.svg";
import NotionIcon from "public/images/notion.svg";
import FolderAddIcon from "public/images/folder-add.svg";
import Image from "next/image";
import { useCreateChatbotContext } from "./create-knowledge-context";
import { useKBDetail } from "@/hooks/api/kb";
import { useParams } from "next/navigation";
import { useChatbotDetail } from "@/hooks/api/chatbot";

export default function Step1({ selectedButton, setSelectedButton }: { selectedButton: string, setSelectedButton: Function }) {
    const {handleChangeKb} = useCreateChatbotContext()
    const {id} = useParams()
    const chatbotDetail = useChatbotDetail({
		chatbot_id:id as string
	})

	const kbDetail = useKBDetail({kb_id:chatbotDetail.data?.data.data.kb_id as string})

    if (kbDetail.isLoading)
        return <>Loading...</>

	
    return (
        <div className="mx-56 grid grid-cols-2 gap-4 text-white font-bold mt-10">
            {
                kbDetail.data?.data.data.type == 'twitter'?
                <button className={`flex flex-col px-20 py-10 items-center border-2 ${selectedButton == 'twitter' ? 'border-[#01F7FF] bg-[#181B1F]' : 'border-[#50575F]'} rounded-2xl`} 
                    onClick={() => {
                        handleChangeKb('type','twitter')
                        setSelectedButton('twitter')
                    }}>
                    <Image width={48} height={48} src={XIcon} alt="X Icon" />
                    <h3 className="pt-6">Connect Twitter</h3>
                </button>
                : kbDetail.data?.data.data.type == 'files' ? 
                <button className={`flex flex-col px-20 py-10 items-center border-2 ${selectedButton == 'files' ? 'border-[#01F7FF] bg-[#181B1F]' : 'border-[#50575F]'} rounded-2xl`} 
                    onClick={() => {
                        handleChangeKb('type','files')
                        setSelectedButton('files')
                    }}>
                    <Image width={48} height={48} src={FolderAddIcon} alt="Folder Add Icon" />
                    <h3 className="pt-6">Upload files</h3>
                </button>
                : kbDetail.data?.data.data.type == 'notion' ? 
                
                <button className={`flex flex-col px-20 py-10 items-center border-2 ${selectedButton == 'notion' ? 'border-[#01F7FF] bg-[#181B1F]' : 'border-[#50575F]'} rounded-2xl`} 
                    onClick={() => {
                        handleChangeKb('type','notion')
                        setSelectedButton('notion')
                    }}>
                    <Image width={48} height={48} src={NotionIcon} alt="Notion Icon" />
                    <h3 className="pt-6">Connect Notion</h3>
                </button>:<></>
            }
            
            
            
        </div>
    )
}