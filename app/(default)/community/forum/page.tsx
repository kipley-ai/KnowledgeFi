export const metadata = {
  title: "Forum - Mosaic",
  description: "Page description",
};

import Image from "next/image";
import ForumLeftContent from "./forum-left-content";
import ForumEntries from "./forum-entries";
import ForumRightContent from "./forum-right-content";

import { useUserDetail } from "@/hooks/api/user";

export default function Forum() {
  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 md:py-0 lg:px-8">
      <div className="xl:flex">
        {/* Left + Middle content */}
        <div className="flex-1 md:flex">
          {/* Left content */}
          <ForumLeftContent />

          {/* Middle content */}
          <div className="flex-1 md:ml-8 xl:mx-4 2xl:mx-8">
            <div className="md:py-8">
              {/* Buttons group */}
              <div className="mb-4">
                <div className="flex w-full flex-wrap -space-x-px">
                  <button className="btn grow rounded-none border-slate-200 bg-white text-indigo-500 first:rounded-l last:rounded-r dark:border-slate-700 dark:bg-slate-800">
                    Popular
                  </button>
                  <button className="btn grow rounded-none border-slate-200 bg-white text-slate-600 first:rounded-l last:rounded-r hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/20">
                    Newest
                  </button>
                  <button className="btn grow rounded-none border-slate-200 bg-white text-slate-600 first:rounded-l last:rounded-r hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700/20">
                    Following
                  </button>
                </div>
              </div>

              {/* Forum Entries */}
              <div className="space-y-2">
                <ForumEntries />
              </div>

              {/* Pagination */}
              <div className="mt-6 text-right">
                <nav
                  className="inline-flex"
                  role="navigation"
                  aria-label="Navigation"
                >
                  <ul className="flex justify-center">
                    <li className="ml-3 first:ml-0">
                      <span className="btn border-slate-200 bg-white text-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-600">
                        &lt;- Previous
                      </span>
                    </li>
                    <li className="ml-3 first:ml-0">
                      <a
                        className="btn border-slate-200 bg-white text-indigo-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                        href="#0"
                      >
                        Next -&gt;
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Right content */}
        <ForumRightContent />
      </div>
    </div>
  );
}
