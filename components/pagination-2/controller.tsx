import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination2 } from "@/lib/pagination";
import { PaginationArrow } from "./arrow";
import { PaginationNumber } from "./number";

export const PaginationController = ({
  currentPage,
  onPageChange,
  totalPages,
	pageQuery,
}: {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
	pageQuery?: string;
}) => {
  const pages = generatePagination2(currentPage, totalPages);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <div className="flex justify-center py-3">
        <nav className="flex" role="navigation" aria-label="Navigation">
          <PaginationArrow
            onClick={handlePrevPage}
            direction="left"
            isDisabled={currentPage <= 1}
          />
          <ul className="inline-flex gap-0.5 -space-x-px text-sm font-medium shadow-sm">
            {pages.map((page, index) => (
              <PaginationNumber
                key={index}
                page={page}
                onClick={(page: number) => onPageChange(page)}
                isActive={currentPage === page}
              />
            ))}
          </ul>
          <PaginationArrow
            onClick={handleNextPage}
            direction="right"
            isDisabled={currentPage >= totalPages}
          />
        </nav>
      </div>
    </>
  );
};
