import { useSearchParams } from "next/navigation";
import { getTimeStringLocal } from "@/lib/string";
import { PaginationController } from "@/components/pagination-2/controller";
import Link from "next/link";
import Image from "next/image";
import InvoiceIcon from "public/images/invoice-icon.svg";
import { useDepositHistory } from "@/hooks/api/user";
import { FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";

export default function DepositHistory() {
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);

  const { isPending, isError, error, data, isFetching } = useDepositHistory(
    {
      page: currentPage,
      page_size: pageSize,
      sort_by: "created_at",
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

  const { deposit_history_data: deposit, deposit_history_count: depositCount } =
    data?.data?.data;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-slate-100">
          Deposit History
        </h1>
      </div>
      <ContentListComponent
        deposits={deposit}
        totalPages={Math.ceil(Number(depositCount) / pageSize)}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
}

// function* generateEarningData(n: number): Generator<DepositData> {
// 	for (let i = 1; i <= n; i++) {
// 		yield {
// 			description: "Credit Charge",
// 			amount: `$${100 + i}`,
// 			status: "Expired",
// 			date: getTimeString(new Date()),
// 			invoice: "#",
// 		};
// 	}
// }

// const depositData = Array.from(generateEarningData(20));

// interface DepositData {
// 	description: string;
// 	amount: string;
// 	date: string;
// 	status: "Expired" | "Not Expired";
// 	invoice: string;
// }

const ContentListComponent = ({
  deposits,
  totalPages,
  currentPage,
  handlePageChange,
}: {
  deposits: any;
  totalPages: number;
  currentPage: number;
  handlePageChange: any;
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
                Description
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Amount
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
                Status
              </th>
              <th
                scope="col"
                className="px-2 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Invoice
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {deposits?.map((deposit: any, index: number) => {
              return (
                <tr key={index} className="hover:bg-zinc-900">
                  <td className="whitespace-nowrap px-2 py-4 text-white">
                    {deposit.description}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 text-white">
                    {`${deposit.pay_amount} ${deposit.pay_currency}`}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4 text-gray-500">
                    {getTimeStringLocal(new Date(deposit.created_at))}
                  </td>
                  {/* <td
										className={`${
											deposit.status == "Expired"
												? "text-red-500"
												: "text-green-400"
										} px-2 py-4 whitespace-nowrap`}
									>
										{deposit.status}
									</td> */}
                  <td
                    className={`${
                      deposit.pay_status ? "text-green-400" : "text-red-500"
                    } whitespace-nowrap px-2 py-4`}
                  >
                    {deposit.pay_status ? "Paid" : "Expired"}
                  </td>
                  <td>
                    <Link href="#">
                      <div className="flex pl-5 hover:cursor-pointer">
                        <Image
                          src={InvoiceIcon}
                          alt="Invoice link"
                          width={30}
                          height={30}
                        />
                      </div>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationController
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </>
  );
};
