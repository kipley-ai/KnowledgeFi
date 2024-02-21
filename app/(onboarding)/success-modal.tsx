import Image from 'next/image'
import CheckIcon from 'public/images/check-icon.svg';
import CrossIcon from "public/images/cross-icon.svg";
import ModalBlank from '@/components/modal-blank-2';
import { DM_Sans, Poppins } from 'next/font/google';
import { useRouter } from 'next/navigation';

interface ToastProps {
  children: React.ReactNode
  type?: 'warning' | 'error' | 'success' | ''
  open: boolean
  setOpen: (open: boolean) => void
}

const dmsans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const poppins = Poppins({
    weight: ["400"],
    subsets: ["latin"],
});

export default function SuccessModal({
  children,
  type = '',
  open,
  setOpen,
}: ToastProps) {
    const router = useRouter();
    // TODO: add fail type
    return (
        <ModalBlank isOpen={open} setIsOpen={setOpen}>
            <div className={`flex flex-col w-[410px] items-center rounded-2xl justify-center py-12 px-7 text-white bg-[#181B1F] ${dmsans.className} font-semibold`}>
                <div className="flex flex-row w-full justify-center items-center">
                    {/* <h2 className="text-3xl">Success</h2> */}
                    <h1 className="text-5xl font-bold text-white">Yay! 🎉</h1>
                </div>
                <div className={`flex flex-row ${poppins.className} justify-center items-center my-8 text-sm`}>
                    <Image className="w-[30px] h-[30px] mr-4" src={CheckIcon} alt="check icon" />
                    {children}
                </div>
                <div className='flex w-full'>
                <button
                    onClick={() => router.push('/dashboard')}
                    className="bg-[#353945] rounded-3xl w-full py-2 text-[#01F7FF] text-sm"
                >
                    Enter KnowledgeFi Homepage
                </button>
                </div>
            </div>
        </ModalBlank>
    )
}