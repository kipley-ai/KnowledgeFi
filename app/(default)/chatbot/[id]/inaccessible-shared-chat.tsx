import Link from "next/link";

export default function InaccessibleChat() {
    return (
        <div className="pt-4 flex h-auto grow flex-col gap-2 overflow-auto md:space-y-4">
            <span className="pl-10 text-white ">
                Sorry, this chat is no longer accessible.
            </span>
            <div className="pt-10 flex justify-center items-center">
                <Link href="/dashboard">
                    <button className="w-auto h-12 bg-[#353945] text-[#00FFFF] font-bold py-2 px-4 rounded">
                        Start to explore KnowledgeFi
                    </button>
                </Link>
            </div>
        </div>
    )
}