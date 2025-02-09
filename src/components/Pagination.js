import React from "react";
import "../style/pagination.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageGroupSize = 3;

    const getPageNumbers = () => {
        const currentGroup = Math.ceil(currentPage / pageGroupSize);
        const startPage = (currentGroup - 1) * pageGroupSize + 1;
        const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="pagination flex justify-center space-x-2 text-gray-700 mt-5">
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className={`text-base px-3 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
            >
                &lt;&lt;
            </button>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`text-base px-3 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
            >
                &lt;
            </button>

            {getPageNumbers().map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`text-base px-3 ${
                        currentPage === pageNum ? "font-bold text-black" : "hover:text-black"
                    }`}
                >
                    {pageNum}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`text-base px-3 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
            >
                &gt;
            </button>
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`text-base px-3 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
            >
                &gt;&gt;
            </button>
        </div>
    );
};

export default Pagination;
