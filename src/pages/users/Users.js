import React, { useEffect, useState } from "react";
import "../../style/users.css";
import UserList from "../../components/users/UserList";
import { allUserPosts } from "../../service/userAPI";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const usersPerPage = 10; // 페이지당 표시할 유저 수
    const pageGroupSize = 3; // 한 번에 보여줄 페이지 수

    const fetchUsers = async () => {
        try {
            setError(null);
            setLoading(true);
            const response = await allUserPosts();
            setUsers(response);
        } catch (error) {
            setError("전체회원 정보를 불러오는데 실패했습니다.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 검색 필터링
    const filteredUsers = users.filter(
        (user) =>
            user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 페이지네이션을 위한 데이터 설정
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // 페이지 그룹 계산
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

    // 페이지 변경
    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="users">
            <h3 className="title">회원 관리</h3>

            {/* 검색 기능 및 회원 추가 버튼 */}
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
                <button className="add-user-button" onClick={() => setIsModalOpen(true)}>
                    회원 추가
                </button>
            </div>

            {/* 회원 리스트 */}
            {error ? (
                <div className="flex justify-center items-center py-20 text-red-500">
                    {error}
                </div>
            ) : loading ? (
                <div className="flex justify-center items-center py-20">Loading...</div>
            ) : users.length > 0 ? (
                <>
                    {/* UserList 컴포넌트 */}
                    <div className="user-list">
                        <UserList 
                            users={currentUsers} 
                            fetchUsers={fetchUsers} 
                            isModalOpen={isModalOpen} 
                            setIsModalOpen={setIsModalOpen} 
                        />
                    
                        {/* 페이지네이션 */}
                        {totalPages > 1 && (
                            <div className="pagination flex justify-center space-x-2 text-gray-700 mt-5">
                                <button
                                    onClick={() => handlePageChange(1)}
                                    disabled={currentPage === 1}
                                    className={`text-base px-3 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
                                >
                                    &lt;&lt;
                                </button>
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`text-base px-3 ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
                                >
                                    &lt;
                                </button>

                                {getPageNumbers().map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`text-base px-3 ${
                                            currentPage === pageNum ? "font-bold text-black" : "hover:text-black"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`text-base px-3 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
                                >
                                    &gt;
                                </button>
                                <button
                                    onClick={() => handlePageChange(totalPages)}
                                    disabled={currentPage === totalPages}
                                    className={`text-base px-3 ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:text-black"}`}
                                >
                                    &gt;&gt;
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center py-20 text-gray-500 border-t border-b">
                    등록된 회원정보가 없습니다.
                </div>
            )}
        </div>
    );
}

export default Users;