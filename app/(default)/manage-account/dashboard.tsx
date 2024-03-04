import DashboardCard05 from "@/app/(dashboard)/dashboard/dashboard-card-05";
import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import Image from "next/image";
import ImageInput from "@/components/image-input-2";
import LoadingIcon from "public/images/loading-icon.svg";
import ConvoCheckMarkIcon from "@/components/icon/convo.svg";
import PersonIcon from "@/components/icon/person.svg";
import ConvoIcon from "@/components/icon/convo.svg";
import CodeIcon from "@/components/icon/code.svg";
import TwitterIcon from "@/components/icon/twitter.svg";
import AvatarDefault from "public/images/avatar-default-02.svg";
import { chartColors } from "@/components/charts/chartjs-config";
import SignOutIcon from "@/public/images/sign-out.svg";

import { useUpdateUserAPI, useUserDetail } from "@/hooks/api/user";
import { profile } from "console";
import { useAccount } from "wagmi";
import { useCreditBalance } from "@/hooks/api/credit";
import { useAppProvider } from "@/providers/app-provider";
import ModalTopUp from "@/components/modal-top-up";
import { signIn, signOut, useSession } from "next-auth/react";
import { uploadFile } from "@/utils/utils";

export const DateFilterComponent = () => (
  <>
    <div className="flex items-start justify-start gap-3">
      <div className="flex h-12 items-center justify-between rounded-xl border-2 border-zinc-900 px-4 py-3">
        <div className="font-mediumleading-normal pr-4 text-base text-slate-100">
          Last 30 days
        </div>
        <div className="flex items-center truncate">
          <svg
            className="ml-1 h-3 w-3 shrink-0 fill-current text-slate-100"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </div>
    </div>
  </>
);

const StatsCard = ({
  title,
  number,
  icon,
}: {
  title: string;
  number: string;
  icon: any;
}): JSX.Element => (
  <>
    <div className="flex h-56 w-80 gap-4 ">
      <div className="flex grow flex-col gap-4 rounded-2xl bg-gradient-to-r from-cyan-200 to-blue-200 p-10">
        <Image
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-2 shadow"
          src={icon}
          width={32}
          height={32}
          alt={`${title} icon`}
        />
        {/* <div className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-xl shadow"></div> */}
        <div className="flex h-20 flex-col items-start justify-start">
          <div className="text-base font-semibold text-zinc-900">{title}</div>
          <div className="text-4xl font-semibold text-zinc-900">{number}</div>
        </div>
      </div>
    </div>
  </>
);

interface ChatData {
  title: string;
  value: string;
  type: string;
}

const ContentListComponent = ({ chats }: { chats: ChatData[] }) => {
  return (
    <>
      <div className="flex flex-col rounded-xl border border-zinc-700">
        <div className="flex items-center justify-between border-b border-zinc-700 bg-zinc-800 px-8 py-5 backdrop-blur-xl">
          <span className="text-sm font-semibold text-gray-500">Title</span>
          <span className="text-sm font-medium text-gray-500">Value</span>
          <span className="text-sm font-semibold text-gray-500">Action</span>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {chats.map((chat, index) => {
            const chatIcon = chat.type == "code" ? CodeIcon : ConvoIcon;
            const bgColor =
              chat.type == "code" ? "bg-orange-400" : "bg-purple-400";

            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl p-4 hover:bg-zinc-900"
              >
                <div className="flex items-center gap-5 ">
                  <Image
                    className={`flex h-10 w-10 items-center justify-center p-2 ${bgColor} rounded-xl shadow`}
                    src={chatIcon}
                    width={32}
                    height={32}
                    alt={`${chat.title} icon`}
                  />
                  <span className="text-base font-semibold text-white">
                    {chat.title}
                  </span>
                </div>
                <span className="text-base font-bold text-gray-500">
                  {chat.value}
                </span>
                <button className="h-8 rounded-3xl border-2 border-cyan-400 px-2.5 py-1 text-xs font-semibold text-cyan-400">
                  Withdraw
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const MyActivityTable = () => {
  return (
    <div className="flex w-full  flex-col">
      <table className="mx-3 my-4 w-full table-auto text-left font-semibold text-white">
        <thead>
          <tr className="border-b border-gray-700 text-sm text-[#7C878E]">
            <th className="py-5 pl-8">My Activity</th>
            <th className="py-5 ">Amount</th>
            <th className="py-5 ">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-5 pl-8">Buy Credit</td>
            <td className="py-5 ">500</td>
            <td className="py-5 text-gray-500">10 mins ago</td>
          </tr>
          <tr>
            <td className="py-5 pl-8">Withdrawal</td>
            <td className="py-5">1000</td>
            <td className="py-5 text-gray-500">8 mins ago</td>
          </tr>
          <tr>
            <td className="py-5 pl-8">Buy Credit</td>
            <td className="py-5">200</td>
            <td className="py-5 text-gray-500">5 mins ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const chatData = [
  { title: "Chat 101", value: "2.5 ETH", type: "convo" },
  { title: "Chat 202", value: "2.5 ETH", type: "code" },
  { title: "Chat 303", value: "2.5 ETH", type: "convo" },
  { title: "Chat 404", value: "2.5 ETH", type: "code" },
  { title: "Chat 505", value: "2.5 ETH", type: "code" },
  { title: "Chat 606", value: "2.5 ETH", type: "code" },
];

export default function AccountSettings() {
  const updateProfileImage = useUpdateUserAPI();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profileImage, setProfileImage] = useState<any>(AvatarDefault);

  const { data: twitterSession, status: twitterStatus } = useSession();

  const { modalTopUp, setModalTopUp } = useAppProvider();
  const { data: userDetail, isLoading } = useUserDetail();
  const address = userDetail?.data?.data.wallet_addr;

  useEffect(() => {
    if (userDetail?.data) {
      setProfileImage(userDetail.data.data.profile_image || AvatarDefault);
      if (
        twitterStatus == "authenticated" &&
        userDetail.data.data.profile_image == ""
      ) {
        setProfileImage(twitterSession?.user?.image);
      }
    }
    // setShowTwitterLogin(walletConnected && twitterStatus !== "authenticated");
    // setShowAccountButton(walletConnected && twitterStatus === "authenticated");

    // console.log(twitterSession);
  }, [twitterStatus, userDetail]);

  const handleProfileImage = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      uploadFile(file, (uploadedFile: string) => {
        setProfileImage(uploadedFile);
        updateProfileImage.mutate({
          profile_image: uploadedFile,
        });
      });
    }
  };

  return (
    <div className="flex w-5/6 flex-col px-10 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-100">
          Account Information
        </h1>
        {/* <DateFilterComponent /> */}
      </div>
      <hr className="my-4 border border-gray-600" />
      {/* Profile Picture */}
      <p className="font-semibold text-white">Profile</p>
      <div className="mb-8 mt-4 flex items-center justify-between">
        <div className="relative flex items-center">
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="relative"
          >
            <Image
              src={profileImage}
              width={50}
              height={50}
              alt="Profile Image"
              className="rounded-full transition duration-300 ease-in-out"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-sm font-semibold text-white opacity-0 transition duration-300 ease-in-out hover:opacity-100">
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.4274 1.51321L10.1026 2.83799L13.6609 6.39627L14.9857 5.07149C15.67 4.38721 15.67 3.27867 14.9857 2.59438L13.9073 1.51321C13.223 0.828929 12.1144 0.828929 11.4302 1.51321H11.4274ZM9.48405 3.45658L3.10377 9.83959C2.81911 10.1243 2.61109 10.4773 2.49613 10.8633L1.52718 14.1561C1.45875 14.3887 1.52171 14.6378 1.69141 14.8075C1.86111 14.9772 2.11019 15.0402 2.34011 14.9745L5.63289 14.0055C6.01883 13.8906 6.37192 13.6825 6.65658 13.3979L13.0423 7.01486L9.48405 3.45658Z"
                  fill="#01F7FF"
                />
              </svg>
              <p className="ml-1 text-[#01F7FF]">Edit</p>
            </div>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleProfileImage}
          />
          <div className="items-between ml-4">
            <p className="text-sm text-slate-400">
              {address?.substring(0, 11) +
                "..." +
                address?.substring(address.length - 11)}
            </p>
          </div>
        </div>
      </div>
      {/* Connected Account */}
      <p className="text-sm text-slate-400">Connected Account</p>
      <div className="mb-4 mt-4 flex items-center justify-between">
        <div className="flex items-center">
          {/* Placeholder for Twitter icon SVG */}
          <svg
            width="43"
            height="43"
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="43" height="43" rx="21.5" fill="#222325" />
            <path
              d="M10.8017 11.8252L18.9913 22.7524L10.75 31.6366H12.6048L19.8201 23.8583L25.6498 31.6366H31.9618L23.3114 20.0948L30.9823 11.8252H29.1275L22.4826 18.9889L17.1137 11.8252H10.8017ZM13.5293 13.1886H16.4291L29.2337 30.2731H26.334L13.5293 13.1886Z"
              fill="white"
            />
          </svg>
          {twitterStatus == "authenticated" ? (
            <span className="ml-4">
              <span className="text-white">Twitter X</span> (@
              {twitterSession.user?.username})
            </span>
          ) : (
            <button
              className="ml-4"
              onClick={() => {
                signIn("twitter", { callbackUrl: "/manage-account" });
              }}
            >
              <p className="font-semibold text-[#01F7FF]">
                Connect Twitter Account
              </p>
            </button>
          )}
        </div>
        {twitterStatus == "authenticated" ? (
          <button
            className="flex items-center rounded-full border border-gray-700 px-4 py-1 text-white"
            onClick={() => {
              signOut();
            }}
          >
            <span className="text-sm">Disconnect</span>
            <Image className="ml-1 pt-2" src={SignOutIcon} alt="signouticon" />
          </button>
        ) : null}
      </div>
      {/* User Overview */}
      <div className="my-8 flex flex-col gap-4 rounded-xl bg-[#1A1D1F] p-6 ">
        <div className="mb-8 flex items-center justify-between">
          {/* <div className="content-none rounded-xl bg-[#B1E5FC]">a</div> */}
          <div className="flex">
            <svg
              width="16"
              height="33"
              viewBox="0 0 16 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.5" width="16" height="32" rx="4" fill="#B1E5FC" />
            </svg>
            <h4 className="ml-4 text-2xl font-semibold text-white">
              User Overview
            </h4>
          </div>
        </div>
        <div className="flex">
          {/* <div className="mr-3 w-1/2 rounded-xl bg-[#293135] p-8">
            <div className="mb-4 w-fit rounded-full bg-white p-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H4V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V4H21C21.5523 4 22 3.55228 22 3C22 2.44772 21.5523 2 21 2H3ZM18 4H6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V4Z"
                  fill="#181B1F"
                />
                <path
                  d="M12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071C8.68342 12.0976 9.31658 12.0976 9.70711 11.7071L11 10.4142V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V10.4142L14.2929 11.7071C14.6834 12.0976 15.3166 12.0976 15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929L12.7071 7.29289Z"
                  fill="#181B1F"
                />
              </svg>
            </div>
            <div className="flex items-center">
              <h4 className="mr-1 text-[16px] font-semibold text-white">
                Token Deposits
              </h4>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z"
                  fill="#EFEFEF"
                />
              </svg>
            </div>
            <h4 className="text-4xl font-semibold text-white">500</h4>
          </div> */}
          <div className="w-1/2 rounded-xl bg-[#2b2d35] p-8">
            <div className="mb-4 w-fit rounded-full bg-white p-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7ZM5 6H19C19.5523 6 20 6.44771 20 7V8H4V7C4 6.44772 4.44772 6 5 6ZM4 10V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V10H4Z"
                  fill="#1A1D1F"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6 15C6 14.4477 6.44772 14 7 14H13C13.5523 14 14 14.4477 14 15C14 15.5523 13.5523 16 13 16H7C6.44772 16 6 15.5523 6 15Z"
                  fill="#1A1D1F"
                />
              </svg>
            </div>
            <div className="flex items-center">
              <h4 className="mr-1 text-[16px] font-semibold text-white">
                Credit Balance
              </h4>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z"
                  fill="#EFEFEF"
                />
              </svg>
            </div>
            <h4 className="text-4xl font-semibold text-white">
              {userDetail?.data.data.credit_balance}
            </h4>
          </div>
        </div>
        {/* <StatsCard
					title="Conversations"
					number="3.8M"
					icon={ConvoCheckMarkIcon}
				/>
				<StatsCard title="Users" number="18,000" icon={PersonIcon} /> */}
      </div>
      {/* <MyActivityTable /> */}
      {/* <div className="py-3">
				<ContentListComponent chats={chatData} />
			</div>
			<div className="dark py-3 rounded-xl">
				<DashboardCard05 />
			</div> */}
    </div>
  );
}
