"use client"
import XIcon from "public/images/X-icon.svg";
import NotionIcon from "public/images/notion.svg";
import FolderAddIcon from "public/images/folder-add.svg";
import Image from "next/image";
import { useCreateChatbotContext } from "../[id]/create-chatbot-context";

export default function Step1({ selectedButton, setSelectedButton }: { selectedButton: string, setSelectedButton: Function }) {
    console.log(selectedButton)
    const {handleChange} = useCreateChatbotContext()
    return (
        <div className="mx-56 grid grid-cols-2 gap-4 text-white font-bold mt-10">
            <button className={`flex flex-col px-20 py-10 items-center border-2 ${selectedButton == 'twitter' ? 'border-[#01F7FF] bg-[#181B1F]' : 'border-[#50575F]'} rounded-2xl`} 
                onClick={() => {
                    handleChange('type','twitter')
                    setSelectedButton('twitter')
                }}>
                <Image width={48} height={48} src={XIcon} alt="X Icon" />
                <h3 className="pt-6">Connect Twitter</h3>
            </button>
            <button className={`flex flex-col px-20 py-10 items-center border-2 ${selectedButton == 'notion' ? 'border-[#01F7FF] bg-[#181B1F]' : 'border-[#50575F]'} rounded-2xl`} 
                onClick={() => {
                    handleChange('type','notion')
                    setSelectedButton('notion')
                }}>
                <Image width={48} height={48} src={NotionIcon} alt="Notion Icon" />
                <h3 className="pt-6">Connect Notion</h3>
            </button>
            <button className={`flex flex-col px-20 py-10 items-center border-2 ${selectedButton == 'local' ? 'border-[#01F7FF] bg-[#181B1F]' : 'border-[#50575F]'} rounded-2xl`} 
                onClick={() => {
                    handleChange('type','files')
                    setSelectedButton('local')
                }}>
                <Image width={48} height={48} src={FolderAddIcon} alt="Folder Add Icon" />
                <h3 className="pt-6">Upload files</h3>
            </button>
        </div>
    )
}