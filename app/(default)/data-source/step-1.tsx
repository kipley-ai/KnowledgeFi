"use client"
import XIcon from "public/images/X-icon.svg";
import NotionIcon from "public/images/notion.svg";
import FolderAddIcon from "public/images/folder-add.svg";
import Image from "next/image";

export default function Step1({ selectedButton, setSelectedButton }: { selectedButton: string, setSelectedButton: Function }) {
    return (
        <div className="mx-64 grid grid-cols-2 gap-4 text-white font-bold mt-10">
            <button className={`flex flex-col px-20 py-10 items-center border-2 border-[#50575F] ${selectedButton == 'twitter' ? 'border-[#01F7FF]' : ''} rounded-3xl`} onClick={() => setSelectedButton('twitter')}>
                <Image src={XIcon} alt="X Icon" />
                <h3 className="pt-6">Connect Twitter</h3>
            </button>
            <button className={`flex flex-col px-20 py-10 items-center border-2 border-[#50575F] ${selectedButton == 'notion' ? 'border-[#01F7FF]' : ''} rounded-3xl`} onClick={() => setSelectedButton('notion')}>
                <Image src={NotionIcon} alt="Notion Icon" />
                <h3 className="pt-6">Connect Notion</h3>
            </button>
            <button className={`flex flex-col px-20 py-10 items-center border-2 border-[#50575F] ${selectedButton == 'local' ? 'border-[#01F7FF]' : ''} rounded-3xl`} onClick={() => setSelectedButton('local')}>
                <Image src={FolderAddIcon} alt="Folder Add Icon" />
                <h3 className="pt-6">Upload files</h3>
            </button>
        </div>
    )
}