import React, { useState } from "react";
import "../../style/notice.css"

const NoticeList = ({ notices }) => {

    // 모달 열림 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    // 셸 클릭 시 모달 열기
    const handleNoticeClick = (noticeId) => {
        setSelectedItem(noticeId);
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
        <div className="notice-list-container">
            {/* 헤더 추가 */}
            <div className="notice-header flex items-center justify-between py-3 border-b-2 border-black font-bold text-center">
                <div className="flex-shrink-0 w-20">번호</div>
                <div className="flex-grow text-center">제목</div>
                <div className="flex-shrink-0 w-64">작성일</div>
                <div className="flex-shrink-0 w-32">작성자</div>
            </div>
            {notices.map((notice) => (
                <div
                    key={notice.id}
                    className="notice-item flex items-center justify-between py-3 border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleNoticeClick(notice.id)}
                >
                    <div className="flex-shrink-0 w-20 text-center">{notice.displayNumber}</div>
                    <div className="flex-grow text-center truncate">{notice.boardTitle}</div>
                    <div className="flex-shrink-0 w-64 text-center">{formatDate(notice.createAt)}</div>
                    <div className="flex-shrink-0 w-32 text-center">{notice.userId}</div>
                </div>
            ))}

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-content">
                        <h2>{selectedItem?.boardTitle}</h2>
                        <p>{selectedItem?.boardContent}</p>
                        <button onClick={closeModal}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );

};

export default NoticeList;