import React, { useEffect, useState } from "react";
import "../../style/blog.css";
import BoardList from "../../components/board/BoardList";
import Pagination from "../../components/Pagination"; 
import { getAllBoards } from "../../service/boardAPI";

function Blogs() {
    {/* 임시데이터 사용*/}
    const [blogs, setBlogs] = useState([
        { id: 1, category: 1, title: "블로그 글 1", nickname: "관리자", createAt: "2024-02-09" },
        { id: 2, category: 2, title: "블로그 글 2", nickname: "사용자1", createAt: "2024-02-08" },
        { id: 3, category: 3, title: "블로그 글 3", nickname: "사용자2", createAt: "2024-02-07" },
        { id: 4, category: 4, title: "블로그 글 4", nickname: "사용자3", createAt: "2024-02-06" },
        { id: 5, category: 1, title: "블로그 글 5", nickname: "관리자", createAt: "2024-02-05" },
        { id: 6, category: 2, title: "블로그 글 6", nickname: "사용자4", createAt: "2024-02-04" },
        { id: 7, category: 1, title: "블로그 글 1", nickname: "관리자", createAt: "2024-02-09" },
        { id: 8, category: 2, title: "블로그 글 2", nickname: "사용자1", createAt: "2024-02-08" },
        { id: 9, category: 3, title: "블로그 글 3", nickname: "사용자2", createAt: "2024-02-07" },
        { id: 10, category: 4, title: "블로그 글 4", nickname: "사용자3", createAt: "2024-02-06" },
        { id: 11, category: 1, title: "블로그 글 5", nickname: "관리자", createAt: "2024-02-05" },
        { id: 12, category: 2, title: "블로그 글 6", nickname: "사용자4", createAt: "2024-02-04" },
        { id: 13, category: 1, title: "블로그 글 1", nickname: "관리자", createAt: "2024-02-09" },
        { id: 14, category: 2, title: "블로그 글 2", nickname: "사용자1", createAt: "2024-02-08" },
        { id: 15, category: 3, title: "블로그 글 3", nickname: "사용자2", createAt: "2024-02-07" },
        { id: 16, category: 4, title: "블로그 글 4", nickname: "사용자3", createAt: "2024-02-06" },
        { id: 17, category: 1, title: "블로그 글 5", nickname: "관리자", createAt: "2024-02-05" },
        { id: 18, category: 2, title: "블로그 글 6", nickname: "사용자4", createAt: "2024-02-04" },
    ]);
    //const [blogs, setBlogs] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const blogsPerPage = 10; // 한 페이지당 블로그 게시물 개수

    // 블로그 데이터 가져오기
    // const fetchBlogs = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await getAllBoards();
    //         const filteredBlogs = response.filter(board => board.category >= 1 && board.category <= 4);
    //         setBlogs(filteredBlogs);
    //     } catch (error) {
    //         setError("블로그 게시물을 불러오는데 실패했습니다.");
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchBlogs();
    // }, []);

    // 검색 필터링
    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 페이지네이션 처리
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0); // 페이지 이동 시 스크롤을 맨 위로 이동
        }
    };

    return (
        <div className="blog">
            <h3 className="title">블로그 관리</h3>

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
            </div>

            {error ? (
                <div className="error-message">{error}</div>
            ) : loading ? (
                <div className="loading-message">Loading...</div>
            ) : filteredBlogs.length > 0 ? (
                <>
                    {/* BoardList 컴포넌트 */}
                    <div className="board-list">
                        {/*<BoardList 
                                boards={currentBlogs} 
                                fetchBoards={fetchBlogs}
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen} />*/}
                        
                        {/* 임시데이터 사용*/}
                        <BoardList 
                            boards={currentBlogs} 
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
                <div className="no-data-message">등록된 블로그 게시물이 없습니다.</div>
            )}
        </div>
    );
}

export default Blogs;