import clsx from "clsx";
import Link from "next/link";

export const PaginationNumber = ({
	page,
	href,
	isActive,
	position,
}: {
	page: number | string;
	href: string;
	position?: "first" | "last" | "middle";
	isActive: boolean;
}) => {
	const className = clsx(
		"rounded inline-flex items-center justify-center leading-5 px-3.5 py-2",
		{
			"text-cyan-400 border border-cyan-400":
				isActive,
			"border border-transparent hover:border-cyan-400 text-slate-600 hover:text-cyan-400":
				!(isActive || page == "..."),
		}
	);

	return isActive || page === "..." ? (
		<div className={className}>{page}</div>
	) : (
		<Link href={href} className={className}>
			{page}
		</Link>
	);
};