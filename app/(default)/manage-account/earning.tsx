import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useEarningReport } from "@/hooks/api/user";
import { PaginationController } from "@/components/pagination-2/controller";
import { keepPreviousData } from "@tanstack/react-query";

export default function Earning() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const { isPending, isError, error, data, isFetching } = useEarningReport(
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

  const {
    earning_report_data: earningData,
    earning_report_count: earningCount,
  } = data.data.data;

  console.log("data :>> ", data);

  const totalPages = Math.ceil(earningCount / pageSize);

  return (
    <div className="flex w-5/6 flex-col px-10 py-8">
      <h1 className="text-3xl font-semibold text-white">Earning Report</h1>
      <table className="mx-3 my-4 w-full table-auto text-left font-semibold text-white">
        <thead>
          <tr className="border-b border-gray-700 text-sm text-[#7C878E]">
            <th className="py-5">Item</th>
            <th className="py-5">Price</th>
            <th className="py-5">Date</th>
            <th className="py-5">Buyer ID</th>
            <th className="py-5">Earnings</th>
            <th className="py-5">Status</th>
          </tr>
        </thead>
        <tbody>
          {earningData.map((earning: any, index: number) => {
            return (
              <tr key={index}>
                <td className="py-5">{earning.title}</td>
                <td className="py-5">{earning.price}</td>
                <td className="py-5 text-gray-500">{earning.date}</td>
                <td className="py-5">{earning.buyer_id}</td>
                <td className="py-5">{earning.earnings}</td>
                <td
                  className={`py-5 ${earning.status === "Success" ? "text-green-300" : "text-red-400"}`}
                >
                  {earning.status}
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
