import React, { useEffect, useState } from "react";
import BoardList from "../../components/board/BoardList";
import Pagination from "../../components/Pagination";
import { getAllBoards } from "../../service/boardAPI";
import "../../style/notice.css";

function Notices() {
    {/* 임시데이터 사용*/}
    const [notices, setNotices] = useState([
            { id: 1, category: 0, title: "공지 글 1", nickname: "관리자", createAt: "2024-02-09" },
            { id: 2, category: 0, title: "공지 글 2", nickname: "사용자1", createAt: "2024-02-08" },
            { id: 3, category: 0, title: "공지 글 3", nickname: "사용자2", createAt: "2024-02-07" },
            { id: 4, category: 0, title: "공지 글 4", nickname: "사용자3", createAt: "2024-02-06" },
            { id: 5, category: 0, title: "공지 글 5", nickname: "관리자", createAt: "2024-02-05" },
            { id: 6, category: 0, title: "공지 글 6", nickname: "사용자4", createAt: "2024-02-04" },
            { id: 7, category: 0, title: "공지 글 1", nickname: "관리자", createAt: "2024-02-09" },
            { id: 8, category: 0, title: "공지 글 2", nickname: "사용자1", createAt: "2024-02-08" },
            { id: 9, category: 0, title: "공지 글 3", nickname: "사용자2", createAt: "2024-02-07" },
            { id: 10, category: 0, title: "공지 글 4", nickname: "사용자3", createAt: "2024-02-06" },
            { id: 11, category: 0, title: "공지 글 5", nickname: "관리자", createAt: "2024-02-05" },
            { id: 12, category: 0, title: "공지 글 6", nickname: "사용자4", createAt: "2024-02-04" },
            { id: 13, category: 0, title: "공지 글 1", nickname: "관리자", createAt: "2024-02-09" },
            { id: 14, category: 0, title: "공지 글 2", nickname: "사용자1", createAt: "2024-02-08" },
            { id: 15, category: 0, title: "공지 글 3", nickname: "사용자2", createAt: "2024-02-07" },
            { id: 16, category: 0, title: "공지 글 4", nickname: "사용자3", createAt: "2024-02-06" },
            { id: 17, category: 0, title: "공지 글 5", nickname: "관리자", createAt: "2024-02-05" },
            { id: 18, category: 0, title: "공지 글 6", nickname: "사용자4", createAt: "2024-02-04" },
        ]);
    //const [notices, setNotices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const noticesPerPage = 10;

    // 공지사항 데이터 가져오기
    // const fetchNotices = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await getAllBoards();
    //         const filteredNotices = response.filter(board => board.category === 0);
    //         setNotices(filteredNotices);
    //     } catch (error) {
    //         setError("공지사항을 불러오는데 실패했습니다.");
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchNotices();
    // }, []);

    // 검색 필터링
    const filteredNotices = notices.filter((notice) =>
        notice.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 페이지네이션 처리
    const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);
    const indexOfLastNotice = currentPage * noticesPerPage;
    const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
    const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0); // 페이지 이동 시 스크롤을 맨 위로 이동
        }
    };

    return (
        <div className="notice">
            <h3 className="title">공지사항 관리</h3>

            {/* 검색 & 공지사항 추가 */}                
            <div className="search-bar-container">
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="add-notice-button" onClick={() => setIsModalOpen(true)}>
                공지사항 추가
                </button>
            </div>
            {/* 공지사항 리스트 */}
            {error ? (
                <div className="flex justify-center items-center py-20 text-red-500">
                    {error}
                </div>

            ) : loading ? (
                <div className="flex justify-center items-center py-20">Loading...</div>
            ) : notices.length > 0 ? (
                <>
                    {/* BoardList 컴포넌트 */}
                    <div className="board-list">
                        {/*<BoardList 
                                boards={currentNotices} 
                                fetchBoards={fetchNotices}
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen} />*/}

                        {/* 임시데이터 사용*/}        
                        <BoardList 
                            boards={currentNotices} 
                            fetchBoards={() => {}}  // 백엔드 호출 없이 빈 함수 전달
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                        />

                        
                        {/* 페이지네이션 */}
                        {totalPages > 1 && (
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={handlePageChange} 
                            />
                        )}
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center py-20 text-gray-500 border-t border-b">
                    등록된 공지사항이 없습니다.
                </div>
            )}

        </div>
    );
}

export default Notices;