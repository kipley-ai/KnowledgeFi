import React from "react";

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
  onClick,
  direction,
  isDisabled,
}: {
  onClick: () => void;
  direction: "left" | "right";
  isDisabled?: boolean;
}) => {
  return (
    <div className={`${direction == "left" ? "mr-2" : "ml-2"}`}>
      <button
        onClick={isDisabled ? () => {} : onClick}
        className={`inline-flex items-center justify-center rounded px-2.5 py-2 leading-5  ${
          isDisabled
            ? "pointer-event-none disabled text-gray-600"
            : "text-gray-400 shadow-sm hover:border-cyan-400 hover:text-white"
        }`}
        disabled={isDisabled}
      >
        {direction == "left" ? <LeftArrow /> : <RightArrow />}
      </button>
    </div>
  );
};
