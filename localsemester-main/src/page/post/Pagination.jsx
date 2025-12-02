const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex justify-center gap-2 mt-4  ">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border-rounded border-none disabled:opacity-50  dark:bg-card-dark"
            >
                ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-3 py-1 border-none border-rounded ${currentPage === i + 1 ? "text-blue-500 underline decoration-blue-500" : ""}`}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded border-none disabled:opacity-50  dark:bg-card-dark"
            >
                →
            </button>
        </div>
    );
};

export default Pagination;