import React from "react";
import clsx from "clsx";

type PaginationNumberProps = {
  page: number | string;
  onClick: (page: number) => void;
  isActive: boolean;
  position?: "first" | "last" | "middle";
};

export const PaginationNumber: React.FC<PaginationNumberProps> = ({
  page,
  onClick,
  isActive,
  position,
}) => {
  const handleClick = () => {
    if (page !== "...") {
      onClick(Number(page));
    }
  };

  const className = clsx(
    "rounded inline-flex items-center justify-center leading-5 px-3.5 py-2 cursor-pointer",
    {
      "text-cyan-400 border border-2 border-cyan-400": isActive,
      "border border-transparent hover:border-cyan-400 text-gray-400 hover:text-cyan-400":
        !isActive && page !== "...",
      "cursor-default": page === "...",
    },
  );

  return (
    <button
      onClick={handleClick}
      className={className}
      disabled={page === "..."}
    >
      {page}
    </button>
  );
};
