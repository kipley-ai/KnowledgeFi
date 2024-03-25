import Image from 'next/image';
import TaskCenterImage from 'components/sidebar/img.png';

export default function TaskCenterSideBar() {
    return (
        <div className="flex flex-col items-center">
            <Image src={TaskCenterImage} alt="Task Center" className="z-[-999]" />
            <button
                className="-mt-[80px] bg-black mt-2 flex w-[50%] justify-center rounded-md border-2 border-[#01F7FF] px-2 py-2 disabled:brightness-50"
            >
                <span className="text-xs font-medium text-[#FCFCFD] duration-200">
                    Task Center
                </span>
            </button>
        </div>
    );
}
