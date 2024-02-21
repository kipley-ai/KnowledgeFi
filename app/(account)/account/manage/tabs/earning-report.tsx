import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationController } from "@/components/pagination-2/controller";
import { getTimeString } from "@/lib/string";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import { useEarningReport } from "@/hooks/api/user";
import { useState } from "react";

interface EarningData {
  item: string;
  price: number;
  date: string;
  buyerId: string;
  earnings: number;
  status: "Success" | "Failed";
}

export default function EarningReport() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const { isPending, isError, error, data, isFetching } = useEarningReport(
    {
      page: Number(currentPage),
      page_size: Number(pageSize),
      sort_by: "created_at",
    },
    keepPreviousData,
  );

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return (
      <div className="flex h-32 w-full items-center justify-center gap-4">
        <FaSpinner size={20} className="animate-spin" />
        <p className="text-md text-gray-300">Loading</p>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-100">
          Earning Reports
        </h1>
      </div>
      <ContentListComponent
        earnings={data.earning_report_data as EarningData[]}
        totalPages={Math.ceil(
          Number(data.earning_report_count) / Number(pageSize),
        )}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
}

function* generateEarningData(n: number): Generator<EarningData> {
  for (let i = 1; i <= n; i++) {
    yield {
      item: `Chatbot ${101 + i}`,
      price: Math.floor(Math.random() * 100) + 100, // Random price between 100 and 600
      date: getTimeString(new Date()),
      buyerId: `#cheyn_${2391 + i}`, // Buyer ID like B001, B002, ...
      earnings: Math.floor(Math.random() * 100) + 50, // Random earnings between 50 and 350
      status: Math.random() > 0.5 ? "Success" : "Failed", // Random status
    };
  }
}

const earningData = Array.from(generateEarningData(20));

const ContentListComponent = ({
  earnings,
  totalPages,
  currentPage,
  onPageChange,
}: {
  earnings: EarningData[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  return (
    <>
      <div className="flex flex-col">
        <table className="min-w-full divide-y divide-zinc-700 rounded-xl">
          <thead className="bg-transparent">
            <tr>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Item
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Buyer ID
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Earnings
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {earnings.map((earning, index) => {
              return (
                <tr key={index} className="hover:bg-zinc-900">
                  <td className="whitespace-nowrap px-2 py-4 text-white">
                    {earning.item}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 text-white">
                    {earning.price}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4">
                    {earning.date}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 text-white">
                    {earning.buyerId}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 text-white">
                    {earning.earnings}
                  </td>
                  <td
                    className={`${
                      earning.status == "Success"
                        ? "text-green-400"
                        : "text-red-500"
                    } whitespace-nowrap px-2 py-4`}
                  >
                    {earning.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationController
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};
