import React, { useState } from "react";
import "../../style/userlist.css"

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
        <div className="user-list-container">
            {/* 테이블 헤더 */}
            <div className="user-table-header">
                <div className="table-cell">Type Number</div>
                <div className="table-cell">User ID</div>
                <div className="table-cell">Nickname</div>
                <div className="table-cell">RoleType</div>
            </div>

            {/* 사용자 목록 */}
            {users.map((user) => (
                <div
                    key={user.typeNum}
                    className="user-table-row"
                    onClick={() => handleNoticeClick(user)}
                >
                    <div className="table-cell">{user.typeNum}</div>
                    <div className="table-cell">{user.userId}</div>
                    <div className="table-cell">{user.nickname}</div>
                    <div className="table-cell">{user.roleType}</div>
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