export const metadata = {
  title: "Meetups - Mosaic",
  description: "Page description",
};

// import { useRouter } from 'next/navigation'
import { useUserDetail } from "@/hooks/api/user";

import SearchForm from "@/components/search-form";
import MeetupsPosts from "./meetups-posts";
import PaginationNumeric from "@/components/pagination-numeric";

export default function Meetups() {
  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-5 sm:flex sm:items-center sm:justify-between">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
            Discover Meetups ✨
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
          {/* Search form */}
          <SearchForm placeholder="Search…" />

          {/* Add meetup button */}
          <button className="btn bg-indigo-500 text-white hover:bg-indigo-600">
            <svg
              className="h-4 w-4 shrink-0 fill-current opacity-50"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="ml-2 hidden xs:block">Add Meetup</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5">
        <ul className="-m-1 flex flex-wrap">
          <li className="m-1">
            <button className="inline-flex items-center justify-center rounded-full border border-transparent bg-indigo-500 px-3 py-1 text-sm font-medium leading-5 text-white shadow-sm duration-150 ease-in-out">
              View All
            </button>
          </li>
          <li className="m-1">
            <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium leading-5 text-slate-500 shadow-sm duration-150 ease-in-out hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600">
              Online
            </button>
          </li>
          <li className="m-1">
            <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium leading-5 text-slate-500 shadow-sm duration-150 ease-in-out hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600">
              Local
            </button>
          </li>
          <li className="m-1">
            <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium leading-5 text-slate-500 shadow-sm duration-150 ease-in-out hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600">
              This Week
            </button>
          </li>
          <li className="m-1">
            <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium leading-5 text-slate-500 shadow-sm duration-150 ease-in-out hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600">
              This Month
            </button>
          </li>
          <li className="m-1">
            <button className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium leading-5 text-slate-500 shadow-sm duration-150 ease-in-out hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600">
              Following
            </button>
          </li>
        </ul>
      </div>
      <div className="mb-4 text-sm italic text-slate-500 dark:text-slate-400">
        289 Meetups
      </div>

      {/* Content */}
      <MeetupsPosts />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationNumeric />
      </div>
    </div>
  );
}
