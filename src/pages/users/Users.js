import React, { useEffect, useState } from "react";
import "../../style/users.css";
import UserList from "../../components/users/UserList";
import Pagination from "../../components/Pagination";
import { allUserPosts } from "../../service/userAPI";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const usersPerPage = 10; // 페이지당 표시할 유저 수

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
            <hr className="title-line" />
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
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                onPageChange={setCurrentPage} 
                            />
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