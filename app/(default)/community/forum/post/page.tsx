export const metadata = {
  title: "Forum Post - Mosaic",
  description: "Page description",
};

import ForumLeftContent from "../forum-left-content";
import ForumEntry from "./forum-entry";
import ForumPostRightContent from "./forum-post-right-content";

import { useUserDetail } from "@/hooks/api/user";

export default function ForumPost() {
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
              {/* Forum entry */}
              <ForumEntry />
            </div>
          </div>
        </div>

        {/* Right content */}
        <ForumPostRightContent />
      </div>
    </div>
  );
}
