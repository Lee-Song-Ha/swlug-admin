import React, { useEffect, useState } from "react";
import "../../style/users.css";
import UserList from "../../components/users/UserList";
import { allUserPosts } from "../../service/userAPI";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPage, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const usersPerPage = 10;

    const fetchAllUsers = async () => {
        try {
            setError(null);
            setLoading(true);

            const response = await allUserPosts();

            console.log(response);
            setUsers(response);

        } catch (error) {
            setError("전체회원 정보를 불러오는데 실패했습니다.");
            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [currentPage]);

    return (
        <div className="users">
            <h1 className="apply-title text-3xl font-bold text-center mb-6">
                회원 관리
            </h1>

            {/*/!* 검색 입력란 *!/*/}
            {/*<div className="flex justify-end mb-6">*/}
            {/*    <div className="search-bar flex items-center border rounded-full shadow-sm px-4 py-2">*/}
            {/*        <span className="text-sm text-gray-700 mr-2">제목</span>*/}
            {/*        <div className="border-r border-gray-400 h-4 mx-2"></div>*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            placeholder="검색어를 입력하세요"*/}
            {/*            value={searchTerm}*/}
            {/*            onChange={handleSearchChange}*/}
            {/*            onKeyPress={handleKeyPress}*/}
            {/*            className="flex-grow border-none focus:outline-none text-sm text-gray-700"*/}
            {/*        />*/}
            {/*        <button*/}
            {/*            type="button"*/}
            {/*            onClick={handleSearchClick}*/}
            {/*            className="flex items-center justify-center text-gray-700 hover:text-black"*/}
            {/*        >*/}
            {/*            🔍*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/* 공지사항 리스트 */}
            {error ? (
                <div className="flex justify-center items-center py-20 text-red-500">
                    {error}
                </div>
            ) : loading ? (
                <div className="flex justify-center items-center py-20">Loading...</div>
            ) : users.length > 0 ? (
                <UserList users={users} />
            ) : (
                <div className="flex justify-center items-center py-20 text-gray-500 border-t border-b">
                    등록된 회원정보가 없습니다.
                </div>
            )}

            {/*/!* 글쓰기 버튼 컨테이너는 항상 존재하고, 버튼만 조건부 표시 *!/*/}
            {/*<div className="write-button-container">*/}
            {/*    {isAuthenticated && (*/}
            {/*        <button*/}
            {/*            className="write-button"*/}
            {/*            onClick={() => {*/}
            {/*                goToWritePage("notice")*/}
            {/*                window.scrollTo(0, 0);*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            글쓰기*/}
            {/*        </button>*/}
            {/*    )}*/}
            {/*</div>*/}

            {/*/!* 페이지네이션 *!/*/}
            {/*{totalPages > 1 && (*/}
            {/*    <div className="flex justify-center space-x-2 text-gray-700">*/}
            {/*        <button*/}
            {/*            onClick={() => handlePageChange(getPrevGroupFirstPage())}*/}
            {/*            disabled={currentPage <= 3}*/}
            {/*            className={`text-base px-2 hover:text-black ${*/}
            {/*                currentPage <= 3 && "text-gray-400 cursor-not-allowed"*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*            &lt;&lt;*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            onClick={() => handlePageChange(currentPage - 1)}*/}
            {/*            disabled={currentPage === 1}*/}
            {/*            className={`text-base px-2 hover:text-black ${*/}
            {/*                currentPage === 1 && "text-gray-400 cursor-not-allowed"*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*            &lt;*/}
            {/*        </button>*/}
            {/*        {getPageNumbers().map((pageNum) => (*/}
            {/*            <button*/}
            {/*                key={pageNum}*/}
            {/*                onClick={() => handlePageChange(pageNum)}*/}
            {/*                className={`text-base px-3 ${*/}
            {/*                    currentPage === pageNum*/}
            {/*                        ? "font-extrabold text-black"*/}
            {/*                        : "text-gray-700 hover:text-black"*/}
            {/*                }`}*/}
            {/*            >*/}
            {/*                {pageNum}*/}
            {/*            </button>*/}
            {/*        ))}*/}
            {/*        <button*/}
            {/*            onClick={() => handlePageChange(currentPage + 1)}*/}
            {/*            disabled={currentPage === totalPages}*/}
            {/*            className={`text-base px-2 hover:text-black ${*/}
            {/*                currentPage === totalPages && "text-gray-400 cursor-not-allowed"*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*            &gt;*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            onClick={() => handlePageChange(getNextGroupFirstPage())}*/}
            {/*            disabled={currentPage > Math.floor(totalPages / 3) * 3}*/}
            {/*            className={`text-base px-2 hover:text-black ${*/}
            {/*                currentPage > Math.floor(totalPages / 3) * 3 &&*/}
            {/*                "text-gray-400 cursor-not-allowed"*/}
            {/*            }`}*/}
            {/*        >*/}
            {/*            &gt;&gt;*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}

export default Users;