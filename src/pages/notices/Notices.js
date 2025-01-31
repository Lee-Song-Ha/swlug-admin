import React, { useState } from "react";
import NoticeList from "../../components/notices/NoticeList";
import "../../style/notice.css";

function Notices() {

    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPage, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const noticesPerPage = 10;

    return (
        <div className="notice">
            <h1 className="title">공지사항 관리</h1>

            <section className="notice-list">
                {/* 공지사항 리스트 */}
                {error ? (
                    <div className="flex justify-center items-center py-20 text-red-500">
                        {error}
                    </div>

                ) : loading ? (
                    <div className="flex justify-center items-center py-20">Loading...</div>
                ) : notices.length > 0 ? (
                    <NoticeList notices={notices} />
                ) : (
                    <div className="flex justify-center items-center py-20 text-gray-500 border-t border-b">
                        등록된 공지사항이 없습니다.
                    </div>
                )}

                {/* {totalPage > 1 && (
                <div className="pagination">
                    <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                    &lt;&lt;
                    </button>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    &lt;
                    </button>
                    {[...Array(totalPage)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                        {index + 1}
                        </button>
                    ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPage}>
                  &gt;
                </button>
                <button onClick={() => handlePageChange(totalPage)} disabled={currentPage === totalPage}>
                  &gt;&gt;
                </button>
              </div>
          )} */}

            </section>
        </div>
    );
}

export default Notices;