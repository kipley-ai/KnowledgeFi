import Image from "next/image";
import TaskCenterImage from "components/sidebar/img.png";
import Link from "next/link";

export default function TaskCenterSideBar() {
  return (
    <div className="relative flex flex-col items-center">
      <Image src={TaskCenterImage} alt="Task Center" />
      <Link
        href={"/task-center"}
        className="absolute bottom-8 flex w-[50%] justify-center rounded-md border-2 border-[#01F7FF] bg-black px-2 py-2 disabled:brightness-50"
      >
        <span className="text-xs font-medium text-[#FCFCFD] duration-200">
          Task Center
        </span>
      </Link>
    </div>
  );
}
