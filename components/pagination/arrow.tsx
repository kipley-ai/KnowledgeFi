import Link from "next/link";

const LeftArrow = () => (
	<>
		<span className="sr-only">Previous</span>
		<wbr />
		<svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
			<path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
		</svg>
	</>
);

const RightArrow = () => (
	<>
		<span className="sr-only">Next</span>
		<wbr />
		<svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
			<path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
		</svg>
	</>
);

export const PaginationArrow = ({
	href,
	direction,
	isDisabled,
}: {
	href: string;
	direction: "left" | "right";
	isDisabled?: boolean;
}) => {
	return (
		<div className={`${direction == "left" ? "mr-2" : "ml-2"}`}>
			<Link
				href={isDisabled ? "#" : href}
				className={`inline-flex items-center justify-center rounded leading-5 px-2.5 py-2  ${
					isDisabled
						? "text-gray-600 pointer-event-none disabled"
						: "hover:border-cyan-400 text-gray-500 hover:text-white shadow-sm "
				}`}
			>
				{direction == "left" ? <LeftArrow /> : <RightArrow />}
			</Link>
		</div>
	);
};
