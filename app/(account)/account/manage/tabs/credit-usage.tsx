import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getTimeString } from "@/lib/string";
import { PaginationController } from "@/components/pagination-2/controller";
import Link from "next/link";
import Image from "next/image";
import InvoiceIcon from "public/images/invoice-icon.svg";
import { FaSpinner } from "react-icons/fa";
import { keepPreviousData } from "@tanstack/react-query";
import { useCreditUsage } from "@/hooks/api/user";

export default function CreditUsage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-100">Credit Usage</h1>
      </div>
      <ContentListComponent />
    </>
  );
}

function* generateData(n: number): Generator<CreditData> {
  for (let i = 1; i <= n; i++) {
    yield {
      title: Math.random() > 0.5 ? "Buy Credit" : "Share Rewards",
      credit: (100 + i) * (Math.random() > 0.5 ? 1 : -1),
      date: getTimeString(new Date()),
    };
  }
}

const creditData = Array.from(generateData(20));

interface CreditData {
  title: string;
  credit: number;
  date: string;
}

const ContentListComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { isPending, isError, error, data, isFetching } = useCreditUsage(
    {
      page: currentPage,
      page_size: pageSize,
    },
    keepPreviousData,
  );

  const handlePageChange = (page: number) => {
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

  const { credit_usage_data: creditData, credit_usage_count: creditCount } =
    data.data.data;

  const totalPages = Math.ceil(creditCount / pageSize);

  return (
    <>
      <div className="flex flex-col">
        <table className="min-w-full table-auto divide-y divide-zinc-700 rounded-xl">
          <thead className="bg-transparent">
            <tr>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Credit
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {creditData.map((credit: any, index: number) => {
              const isPositive = credit.credit > 0;
              return (
                <tr key={index} className="hover:bg-zinc-900">
                  <td className="whitespace-nowrap px-2 py-4 text-white">
                    {credit.title}
                  </td>
                  <td
                    className={`text-white ${
                      isPositive ? "!text-green-500" : "!text-red-500"
                    } white whitespace-nowrap px-2 py-4`}
                  >
                    {(isPositive ? "+" : "") + credit.credit}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 text-gray-500">
                    {credit.date}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col items-center">
          <div
            className={`${!isFetching && "invisible"} flex w-full items-center justify-center gap-4`}
          >
            <FaSpinner size={20} className="animate-spin" />
            <p className="text-md text-gray-300">Loading</p>
          </div>
          <PaginationController
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
};
