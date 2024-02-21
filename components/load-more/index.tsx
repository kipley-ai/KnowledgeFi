import { FaSpinner } from "react-icons/fa6";

export const LoadMore = ({
  handleLoadMore,
}: {
  handleLoadMore: (e: React.MouseEvent) => void;
}) => {
  return (
    <>
      <div className="flex justify-center py-4">
        <button onClick={handleLoadMore}>
          <div className="flex items-center rounded-xl border-2 border-stone-900 px-5 py-3">
            <span className="text-center text-[15px] font-bold text-neutral-300">
              Load more
            </span>
          </div>
        </button>
      </div>
    </>
  );
};

export const LoadMoreSpinner = () => {
  return (
    <>
      <div className="flex justify-center py-4">
        <div className="flex items-center rounded-xl border-2 border-stone-900 px-5 py-3">
          <FaSpinner size={40} className="animate-spin" />
        </div>
      </div>
    </>
  );
};
