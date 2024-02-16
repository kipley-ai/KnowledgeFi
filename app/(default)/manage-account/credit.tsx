import { DM_Sans } from "next/font/google";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useCreditUsage } from "@/hooks/api/user";
import { PaginationController } from "@/components/pagination-2/controller";
import { keepPreviousData } from "@tanstack/react-query";

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function Credit() {
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
    <div className="flex w-5/6 flex-col px-10 py-8">
      <h1 className="text-3xl font-semibold text-white">Credit Usage</h1>
      <table className="mx-3 my-4 w-full table-auto text-left">
        <thead>
          <tr className="border-b border-gray-700 text-sm text-[#7C878E]">
            <th className="py-5">Title</th>
            <th className="py-5">Credit</th>
            <th className="py-5">Date</th>
          </tr>
        </thead>
        <tbody>
          {creditData.map((credit, index) => {
            const isPositive = credit.credit > 0;
            return (
              <tr className="text-md font-inter">
                <td className="py-5 font-semibold text-white">
                  {credit.title}
                </td>
                <td
                  className={`${
                    isPositive ? "!text-green-500" : "!text-red-400"
                  } py-5 font-bold`}
                >
                  {(isPositive ? "+" : "") + credit.credit}
                </td>
                <td className="py-5 font-semibold text-gray-500">
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
  );
}
