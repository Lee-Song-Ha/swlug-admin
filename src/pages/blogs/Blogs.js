import React, { useEffect, useState } from "react";
import "../../style/blog.css";
import BoardList from "../../components/board/BoardList";
import Pagination from "../../components/Pagination"; 
import WriteComponent from "../../components/board/WriteComponent";
import { getAllBoards } from "../../service/boardAPI";

function Blogs() {
    {/* 임시데이터 사용*/}
    const [blogs, setBlogs] = useState([
        { id: 1, boardCategory : 1, boardTitle: "블로그 글 1", nickname: "관리자", createAt: "2024-02-09", boardContents: "hihi" },
        { id: 2, boardCategory : 2, boardTitle: "블로그 글 2", nickname: "사용자1", createAt: "2024-02-08" },
        { id: 3, boardCategory : 3, boardTitle: "블로그 글 3", nickname: "사용자2", createAt: "2024-02-07" },
        { id: 4, boardCategory : 4, boardTitle: "블로그 글 4", nickname: "사용자3", createAt: "2024-02-06" },
        { id: 5, boardCategory : 1, boardTitle: "블로그 글 5", nickname: "관리자", createAt: "2024-02-05" },
        { id: 6, boardCategory : 2, boardTitle: "블로그 글 6", nickname: "사용자4", createAt: "2024-02-04" },
        { id: 7, boardCategory : 1, boardTitle: "블로그 글 1", nickname: "관리자", createAt: "2024-02-09" },
        { id: 8, boardCategory : 2, boardTitle: "블로그 글 2", nickname: "사용자1", createAt: "2024-02-08" },
        { id: 9, boardCategory : 3, boardTitle: "블로그 글 3", nickname: "사용자2", createAt: "2024-02-07" },
        { id: 10, boardCategory : 4, boardTitle: "블로그 글 4", nickname: "사용자3", createAt: "2024-02-06" },
        { id: 11, boardCategory : 1, boardTitle: "블로그 글 5", nickname: "관리자", createAt: "2024-02-05" },
        { id: 12, boardCategory : 2, boardTitle: "블로그 글 6", nickname: "사용자4", createAt: "2024-02-04" },
        { id: 13, boardCategory : 1, boardTitle: "블로그 글 1", nickname: "관리자", createAt: "2024-02-09" },
        { id: 14, boardCategory : 2, boardTitle: "블로그 글 2", nickname: "사용자1", createAt: "2024-02-08" },
        { id: 15, boardCategory : 3, boardTitle: "블로그 글 3", nickname: "사용자2", createAt: "2024-02-07" },
        { id: 16, boardCategory : 4, boardTitle: "블로그 글 4", nickname: "사용자3", createAt: "2024-02-06" },
        { id: 17, boardCategory : 1, boardTitle: "블로그 글 5", nickname: "관리자", createAt: "2024-02-05" },
        { id: 18, boardCategory : 2, boardTitle: "블로그 글 6", nickname: "사용자4", createAt: "2024-02-04" },
    ]);
    //const [blogs, setBlogs] = useState([]); 
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedBoard, setSelectedBoard] = useState(null);

    const blogsPerPage = 10; // 한 페이지당 블로그 게시물 개수

    // 카테고리 옵션 리스트
    const categoryOptions = [
        { value: "all", label: "전체" },
        { value: "1", label: "성과" },
        { value: "2", label: "정보" },
        { value: "3", label: "후기" },
        { value: "4", label: "활동" },
    ];

    // 블로그 데이터 가져오기
    // const fetchBlogs = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await getAllBoards();
    //         const filteredBlogs = response.filter(board => board.boardCategory  >= 1 && board.boardCategory  <= 4);
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

    // 검색 및 카테고리 필터 적용
    const filteredBlogs = blogs.filter((blog) =>
        (selectedCategory === "all" || blog.boardCategory .toString() === selectedCategory) &&
        blog.boardTitle.toLowerCase().includes(searchTerm.toLowerCase())
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

    // 게시글 클릭 핸들러 (BoardList에서 호출할 함수)
    const handleBoardClick = (board) => {
        setSelectedBoard(board);
        // 게시글을 선택할 때 히스토리에 새 엔트리 추가
        window.history.pushState({ boardSelected: true }, "");
    };

    // popstate 이벤트 리스너: 브라우저 뒤로 가기 시 selectedBoard를 null로 설정
    useEffect(() => {
        const handlePopState = () => {
            setSelectedBoard(null);
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    return (
        <div className="blog">
            <h3 className="title">블로그 관리</h3>
            <hr className="title-line" />
            {selectedBoard ? (
                // 게시글이 선택된 경우: 검색창/페이지네이션 숨김
                <div>                    
                    <WriteComponent 
                    postToEdit={selectedBoard} 
                    fetchBoards={() => {}} 
                    //fetchBoards={fetchBlogs}
                    onCancel={() => setSelectedBoard(null)}
                    />
                </div>
            ) : (
                <>
                <div className="search-bar-container">
                    <select
                        className="category-filter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
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
                                    setSelectedBoard={handleBoardClick} />*/}
                            
                            {/* 임시데이터 사용*/}
                            <BoardList 
                                boards={currentBlogs} 
                                fetchBoards={() => {}}  // 백엔드 호출 없이 빈 함수 전달
                                setSelectedBoard={handleBoardClick}
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
            </>
            )}
        </div>
    );
}

export default Blogs;