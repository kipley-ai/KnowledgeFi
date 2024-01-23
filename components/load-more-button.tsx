const LoadMoreButton = ({ onClick, children }) => {
    return (
        <button>
            <div className="flex items-center rounded-xl border-2 border-stone-900 px-5 py-3">
                <span
                    className="text-[15px] font-bold text-neutral-300 text-center"
                    onClick={onClick}
                >
                    {children}
                </span>
            </div>
        </button>
    );
};

export default LoadMoreButton;
