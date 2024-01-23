import DashboardCard05 from "@/app/(dashboard)/dashboard/dashboard-card-05";
import { DateFilterComponent } from "./dashboard";

export default function CreatorOverview() {
    return (
    <div className="flex flex-col py-8 px-10 w-5/6">
    <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-slate-100">Dashboard</h1>
        <DateFilterComponent />
    </div>
    <div className="flex flex-col gap-4 my-8 bg-[#1A1D1F] rounded-xl p-6 ">
        <div className="flex items-center justify-between mb-8">
            {/* <div className="content-none rounded-xl bg-[#B1E5FC]">a</div> */}
            <div className="flex">
                <svg width="16" height="33" viewBox="0 0 16 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="0.5" width="16" height="32" rx="4" fill="#B5E4CA"/>
                </svg>
                <h4 className="ml-4 text-2xl font-semibold text-white">User Overview</h4>
            </div>
            <button className="text-[#1A1D1F] text-base rounded-full bg-[#B5E4CA] px-4 py-3 font-semibold">
                Withdraw your earnings
            </button>
        </div>
        <div className="flex">
            <div className="bg-[#373f3c] rounded-xl p-8 w-1/2 mr-3">
                <div className="rounded-full p-3 bg-white w-fit mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 2C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H4V18C4 20.2091 5.79086 22 8 22H16C18.2091 22 20 20.2091 20 18V4H21C21.5523 4 22 3.55228 22 3C22 2.44772 21.5523 2 21 2H3ZM18 4H6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V4Z" fill="#181B1F"/>
                        <path d="M12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071C8.68342 12.0976 9.31658 12.0976 9.70711 11.7071L11 10.4142V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V10.4142L14.2929 11.7071C14.6834 12.0976 15.3166 12.0976 15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929L12.7071 7.29289Z" fill="#181B1F"/>
                    </svg>
                </div>
                <div className="flex items-center">
                    <h4 className="text-white text-[16px] font-semibold mr-1">Earnings</h4>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z" fill="#EFEFEF"/>
                    </svg>
                </div>
                <h4 className="text-white text-4xl font-semibold">888</h4>
            </div>
            <div className="bg-[#293135] rounded-xl p-8 w-1/2 mr-3">
                <div className="rounded-full p-3 bg-white w-fit mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7ZM5 6H19C19.5523 6 20 6.44771 20 7V8H4V7C4 6.44772 4.44772 6 5 6ZM4 10V17C4 17.5523 4.44772 18 5 18H19C19.5523 18 20 17.5523 20 17V10H4Z" fill="#1A1D1F"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 15C6 14.4477 6.44772 14 7 14H13C13.5523 14 14 14.4477 14 15C14 15.5523 13.5523 16 13 16H7C6.44772 16 6 15.5523 6 15Z" fill="#1A1D1F"/>
                    </svg>
                </div>
                <div className="flex items-center">
                    <h4 className="text-white text-[16px] font-semibold mr-1">Users</h4>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z" fill="#EFEFEF"/>
                    </svg>
                </div>
                <h4 className="text-white text-4xl font-semibold">512</h4>
            </div>
            <div className="bg-[#2b2d35] rounded-xl p-8 w-1/2">
                <div className="rounded-full p-3 bg-white w-fit mb-4">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.4889 3.05441C7.37598 2.52744 6.62402 2.52743 6.5111 3.05442L5.31658 8.62885C5.02017 10.0121 3.79778 11.0003 2.38317 11.0003H1C0.447715 11.0003 0 10.5526 0 10.0003C0 9.44798 0.447715 9.00027 1 9.00027H2.38317C2.85471 9.00027 3.26217 8.67087 3.36097 8.2098L4.55549 2.63536C5.12011 0.000466108 8.87988 0.00044179 9.44451 2.63535L12.5111 16.9461C12.624 17.4731 13.376 17.4731 13.4889 16.9461L14.6834 11.3717C14.9798 9.98847 16.2022 9.00027 17.6168 9.00027H19C19.5523 9.00027 20 9.44798 20 10.0003C20 10.5526 19.5523 11.0003 19 11.0003H17.6168C17.1453 11.0003 16.7378 11.3297 16.639 11.7907L15.4445 17.3652C14.8799 20.0001 11.1201 20.0001 10.5555 17.3652L7.4889 3.05441Z" fill="#1A1D1F"/>
                    </svg>

                </div>
                <div className="flex items-center">
                    <h4 className="text-white text-[16px] font-semibold mr-1">Conversations</h4>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6668 6.99967C13.6668 10.6816 10.6821 13.6663 7.00016 13.6663C3.31826 13.6663 0.333496 10.6816 0.333496 6.99967C0.333496 3.31778 3.31826 0.333008 7.00016 0.333008C10.6821 0.333008 13.6668 3.31778 13.6668 6.99967ZM7.00016 6.33301C7.36835 6.33301 7.66683 6.63148 7.66683 6.99967V10.3336C7.66683 10.7018 7.36835 11.0003 7.00016 11.0003C6.63197 11.0003 6.3335 10.7018 6.3335 10.3336V6.99967C6.3335 6.63148 6.63197 6.33301 7.00016 6.33301ZM7.00016 4.99967C7.36835 4.99967 7.66683 4.7012 7.66683 4.33301C7.66683 3.96482 7.36835 3.66634 7.00016 3.66634C6.63197 3.66634 6.3335 3.96482 6.3335 4.33301C6.3335 4.7012 6.63197 4.99967 7.00016 4.99967Z" fill="#EFEFEF"/>
                    </svg>
                </div>
                <h4 className="text-white text-4xl font-semibold">64M</h4>
            </div>
        </div>
        {/* <StatsCard
            title="Conversations"
            number="3.8M"
            icon={ConvoCheckMarkIcon}
        />
        <StatsCard title="Users" number="18,000" icon={PersonIcon} /> */}
    </div>
    
    {/* <div className="py-3">
        <ContentListComponent chats={chatData} />
    </div> */}
    <div className="dark py-3 rounded-xl">
        <DashboardCard05 />
    </div>
    </div>);
}