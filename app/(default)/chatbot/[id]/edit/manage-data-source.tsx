// ManageDataSources.jsx
import { useState, useEffect } from "react";
import CheckIcon from "public/images/check-icon-2.svg";
import ArrowIcon from "public/images/arrow-3-icon.svg";
import Image from "next/image";
import { useChatbotDetail } from "@/hooks/api/chatbot";
import { useParams } from "next/navigation";
import { useKBDetail, useKBItem, useDeleteKBItem } from "@/hooks/api/kb";
import Link from "next/link";
import { KBItem } from "@/lib/types";
import { PaginationController } from "@/components/pagination-2/controller";
import { keepPreviousData } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";

const ManageDataSources = () => {
  const [checkHeader, setCheckHeader] = useState(false);
  const [checkRow, setCheckRow] = useState<boolean[]>([]);
  const deleteItemAPI = useDeleteKBItem();

  const { id } = useParams();

  const chatbotDetail = useChatbotDetail({
    chatbot_id: id as string,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);

  const { isPending, isError, error, data, isFetching, refetch: kbItemReftech, status } = useKBItem(
    {
      kb_id: chatbotDetail.data?.data.data.kb_id as string,
      page: currentPage,
      page_size: pageSize,
    },
    keepPreviousData,
  );

  useEffect(() => {
    if (status === "success") {
      let temp = data?.data.data.kb_item_data.map(() => false);
      setCheckRow(temp);
    }
  }, [data?.data.data.kb_item_data]);

  const handleCheckRow = (index: number) => {
    let temp = [...checkRow];
    temp[index] = !temp[index];
    setCheckRow(temp);
  };

  const handleCheckAll = () => {
    let temp = [...checkRow];
    temp = temp.map(() => !checkHeader);
    setCheckRow(temp);
    setCheckHeader(!checkHeader);
  };

  const handleDelete = () => {
    const selectedIndexes = checkRow.reduce((acc: number[], value, index) => {
      if (value) {
        acc.push(index);
      }
      return acc;
    }, []);
    const selectedItem = selectedIndexes.map(
      (index) => data?.data.data.kb_item_data[index].item_name!!,
    );

    deleteItemAPI.mutate(
      {
        kb_id: chatbotDetail.data?.data.data.kb_id!!,
        items_name: selectedItem,
      },
      {
        onSuccess: () => {
          kbItemReftech();
        },
      },
    );
  };

  const kbDetail = useKBDetail({
    kb_id: chatbotDetail.data?.data.data.kb_id as string,
  });

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

  const { kb_item_data: kbItemData, kb_item_count: kbItemCount } = data.data.data;

  if (kbItemCount >= 0) {
    const totalPages = Math.ceil(kbItemCount / pageSize);

    return (
      <div className="flex flex-col py-20 font-semibold text-[#7C878E] sm:px-6 lg:px-0">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-normal">Manage Data Sources</h1>
          {/* Add New Button */}
          {kbDetail.data?.data.data.type !== "twitter" && (
            <Link href={"/chatbot/" + id + "/add"}>
              <button
                className="flex items-center justify-center rounded-3xl bg-[#01F7FF] px-8 py-2"
                type="submit"
              >
                <h5 className="mr-3 flex-grow text-sm text-black">Add New</h5>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0001 4.16602V15.8327M4.16675 9.99935H15.8334"
                    stroke="#292D32"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </Link>
          )}
        </div>

        {/* Selected count and Delete Button */}
        <div className="my-4 flex items-center justify-end">
          {checkRow.includes(true) ? (
            <div className="flex items-center">
              <span className="mr-10">
                {checkRow.filter((value) => value === true).length} selected
              </span>
              <button
                className="flex items-center justify-center rounded-3xl border-2 border-[#FF6C3E] bg-transparent px-9 py-2"
                type="submit"
                onClick={handleDelete}
              >
                <h5 className="flex-grow text-sm font-semibold text-[#FF6C3E]">
                  Delete
                </h5>
              </button>
            </div>
          ) : (
            <div>
              <button className="flex items-center justify-center rounded-3xl border-2 border-[#FF6C3E] bg-transparent px-9 py-2 opacity-0">
                <h5 className="flex-grow text-sm font-semibold text-[#FF6C3E]">
                  Delete
                </h5>
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-b border-[#393E44]">
            <thead className="border-b border-t border-[#393E44] text-left">
              <tr>
                <th className="px-3 py-7">
                  <div
                    className={`rounded  ${checkHeader ? "bg-[#01F7FF]" : "border-2 border-[#7C878E] bg-transparent"} flex h-4 w-4 items-center justify-center`}
                    onClick={() => handleCheckAll()}
                  >
                    <Image
                      src={CheckIcon}
                      className={`${checkHeader ? "" : "hidden"}`}
                      alt="Check Icon"
                    />
                  </div>
                </th>{" "}
                {/* Header Checkbox */}
                <th className="">From</th>
                <th className="">Type</th>
                <th className="">Size</th>
                <th className="">Last Updated</th>
                <th className="">Status</th>
              </tr>
            </thead>
            <tbody>
              {kbItemData.map((row: KBItem, index: any) => (
                <tr key={index}>
                  <td className="px-3 py-7">
                    <div
                      className={`rounded  ${checkRow[index] ? "bg-[#01F7FF]" : "border-2 border-[#7C878E] bg-transparent"} flex h-4 w-4 items-center justify-center`}
                      onClick={() => handleCheckRow(index)}
                    >
                      <Image
                        src={CheckIcon}
                        className={`${checkRow[index] ? "" : "hidden"}`}
                        alt="Check Icon"
                      />
                    </div>
                  </td>{" "}
                  {/* Row Checkbox */}
                  <td className="max-w-44 truncate pr-3">{row.item_name}</td>
                  <td className="">{row.item_type}</td>
                  <td className="">{row.size}</td>
                  <td className="">{row.created_at}</td>
                  <td className="">
                    <span
                      className={`inline-flex rounded-full text-left leading-5 ${row.status === "Completed" ? "text-[#BDFF9E]" : "text-[#F85C72]"}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex flex-row items-center justify-center space-x-12">
          <div className="flex flex-col items-center">
            {isFetching ? (
              <div className="flex w-full items-center justify-center gap-4">
                <FaSpinner size={20} className="animate-spin" />
                <p className="text-md text-gray-300">Loading</p>
              </div>
            ) : (
              <>
                {kbItemCount === 0 ? (
                  <div className="text-center">
                    <p className="text-lg text-gray-500">Oh, it seems you got no data here. Why not try adding some?</p>
                  </div>
                ) : (
                  <PaginationController
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    totalPages={Math.ceil(kbItemCount / pageSize)}
                  />
                )}
              </>
            )}
          </div>
        </div>

      </div>
    );
  }
};

export default ManageDataSources;
