import React, { useState } from "react";

const UserList = ({ users }) => {
    // 모달 열림 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // 셸 클릭 시 모달 열기
    const handleNoticeClick = (userId) => {
        setSelectedItem(userId);
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    // 모달 외부 클릭 시 모달 닫기
    const handleOverlayClick = (e) => {
        // 클릭된 영역이 모달 콘텐츠가 아니면 모달을 닫습니다.
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    return (
        <div className="notice-list">
            {/* 헤더 추가 */}
            <div className="notice-header flex items-center justify-between py-3 border-b-2 border-black font-bold text-center">
                <div className="flex-shrink-0 w-20">회원번호</div>
                <div className="flex-grow text-center">아이디</div>
                <div className="flex-shrink-0 w-64">닉네임</div>
                <div className="flex-shrink-0 w-32">권한</div>
            </div>
            {users.map((user) => (
                <div
                    key={user.typeNum}
                    className="notice-item flex items-center justify-between py-3 border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleNoticeClick(user.typeNum)}
                >
                    <div className="flex-shrink-0 w-20 text-center">{user.typeNum}</div>
                    <div className="flex-grow text-center truncate">{user.userId}</div>
                    <div className="flex-shrink-0 w-64 text-center">{user.nickname}</div>
                    <div className="flex-shrink-0 w-32 text-center">{user.roleType}</div>
                </div>
            ))}

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <h2>{selectedItem?.userId}</h2>
                        <p>{selectedItem?.nickname}</p>
                        <button onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;