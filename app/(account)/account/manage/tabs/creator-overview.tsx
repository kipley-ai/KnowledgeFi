import DashboardCard05 from "@/app/(dashboard)/dashboard/dashboard-card-05";
import Image from "next/image";
import ConvoCheckMarkIcon from "@/components/icon/convo.svg";
import PersonIcon from "@/components/icon/person.svg";
import WaveIcon from "public/images/wave.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PaginationController } from "@/components/pagination/controller";

const DateFilterComponent = () => (
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
    <div className="flex-gap flex h-56 w-80 gap-4">
      <div className="flex grow flex-col gap-4 rounded-2xl bg-gray-800 bg-gradient-to-r p-10">
        <Image
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-2 shadow"
          src={icon}
          width={32}
          height={32}
          alt={`${title} icon`}
        />
        {/* <div className="flex items-center justify-center w-10 h-10 p-2 bg-white rounded-xl shadow"></div> */}
        <div className="flex h-20 flex-col items-start justify-start">
          <div className="flex flex-row items-center justify-center gap-2 text-base font-semibold text-zinc-100">
            {title}
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white pt-0.5 text-xs font-semibold text-black hover:bg-blue-700">
              i
            </div>
          </div>
          <div className="text-4xl font-semibold text-zinc-100">{number}</div>
        </div>
      </div>
    </div>
  </>
);

interface ActivityData {
  name: string;
  amount: string;
  lastUpdated: string;
}

function* generateData(n: number): Generator<ActivityData> {
  for (let i = 1; i <= n; i++) {
    yield {
      name: Math.random() > 0.5 ? "Buy Credit" : "Withdrawal",
      amount: `${100 + 100 * i}`,
      lastUpdated: `${i} minutes ago`,
    };
  }
}

const activityData = Array.from(generateData(20));

export default function Dashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const perPage = searchParams.get("perPage") ?? "5";

  const start = (Number(page) - 1) * Number(perPage);
  const end = start + Number(perPage);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-100">
          Creator Overview
        </h1>
        <DateFilterComponent />
      </div>
      <div className="my-8 flex flex-col gap-4 rounded-2xl bg-zinc-900 p-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="rounded-sm bg-sky-200 px-2 py-4"></div>
            <h1 className="pl-2 text-2xl text-zinc-100">Creator Overview</h1>
          </div>
          <button className="rounded-3xl bg-sky-200 px-4 py-2 text-sm text-black">
            Withdraw your earnings
          </button>
        </div>
        <div className="flex flex-row justify-between gap-4 pb-5">
          <StatsCard title="Earnings" number="388" icon={WaveIcon} />
          <StatsCard title="Users" number="512" icon={PersonIcon} />
          <StatsCard
            title="Conversation"
            number="64M"
            icon={ConvoCheckMarkIcon}
          />
        </div>
      </div>
      <div className="dark rounded-xl py-3">
        <DashboardCard05 />
      </div>
    </>
  );
}
