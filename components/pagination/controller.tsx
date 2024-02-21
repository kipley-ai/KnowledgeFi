import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/lib/pagination";
import { PaginationArrow } from "./arrow";
import { PaginationNumber } from "./number";

export const PaginationController = ({
	totalPages,
	pageQuery, 
}: {
	totalPages: number;
	pageQuery: string;
}) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get(pageQuery)) || 1;
	const paginationNumbers = generatePagination(currentPage, totalPages);

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set(pageQuery, pageNumber.toString());
		return `${pathname}?${params?.toString()}`;
	};

	return (
		<>
			<div className="flex justify-center py-3">
				<nav className="flex" role="navigation" aria-label="Navigation">
					<PaginationArrow
						href={createPageURL(currentPage - 1)}
						direction="left"
						isDisabled={currentPage <= 1}
					/>
					<ul className="inline-flex text-sm font-medium -space-x-px shadow-sm gap-0.5">
						{paginationNumbers.map((paginationNumber, index) => {
							const isFirst = index == 0;
							const isLast = index == paginationNumbers.length - 1;
							const position = isFirst ? "first" : isLast ? "last" : "middle";
							const isCurrent = currentPage == Number(paginationNumber);

							return (
								<PaginationNumber
									key={paginationNumber}
									page={paginationNumber}
									href={createPageURL(paginationNumber)}
									isActive={isCurrent}
									position={position}
								/>
							);
						})}
					</ul>
					<PaginationArrow
						href={createPageURL(currentPage + 1)}
						direction="right"
						isDisabled={currentPage >= totalPages}
					/>
				</nav>
			</div>
		</>
	);
};
