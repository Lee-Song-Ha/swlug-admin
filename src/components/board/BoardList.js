import React, { useState } from "react";
import axios from "axios";
import "../../style/modal.css";
import "../../style/board.css";
import { FaEdit, FaTrash } from "react-icons/fa"; // 아이콘 추가

const BoardList = ({ boards, fetchBoards, isModalOpen, setIsModalOpen }) => {
    // 모달 상태 관리
    const [selectedBoard, setSelectedBoard] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        category: "",
        title: "",
        nickname: "",
        createAt: "",
        tags: [],
        image: "",
        content: "",
    });

    // 게시물 클릭 시 모달 열기 (수정)
    const handleBoardClick = (board) => {
        setSelectedBoard(board);
        setFormData({
            id: board.id,
            category: board.category,
            title: board.title,
            nickname: board.nickname,
            createAt: board.createAt,
            tags: board.tags || [],
            image: board.image || "",
            content: board.content || "",
        });
        setIsModalOpen(true);
    };

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.nickname]: e.target.value });
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBoard(null);
    };

    // 게시물 추가 API 호출
    const addBoard = async () => {
        try {
            await axios.post("/api/admin/board/create", formData);
            alert("게시물이 추가되었습니다.");
            fetchBoards(); // 새로고침
            closeModal();
        } catch (error) {
            alert("게시물 추가 실패");
            console.error(error);
        }
    };

    // 게시물 수정 API 호출
    const editBoard = async () => {
        try {
            await axios.post("/api/admin/boards/mode", formData);
            alert("게시물이 수정되었습니다.");
            fetchBoards();
            closeModal();
        } catch (error) {
            alert("게시물 수정 실패");
            console.error(error);
        }
    };

    // 게시물 삭제 API 호출
    const deleteBoard = async (boardId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.post("/api/admin/boards/delete", { boardId });
            alert("게시물이 삭제되었습니다.");
            fetchBoards();
        } catch (error) {
            alert("게시물 삭제 실패");
            console.error(error);
        }
    };

    return (
        <div className="board-list-container">
            {/* 테이블 헤더 */}
            <div className="board-table-header">
                <div className="table-cell">카테고리</div>
                <div className="table-cell">제목</div>
                <div className="table-cell">작성자</div>
                <div className="table-cell">작성일</div>
                <div className="table-cell">관리</div>
            </div>

            {/* 게시물 목록 */}
            {boards.map((board) => (
                <div
                    key={board.id}
                    className="board-table-row"
                    onClick={() => handleBoardClick(board)}
                >
                    <div className="table-cell">{board.category}</div>
                    <div className="table-cell">{board.title}</div>
                    <div className="table-cell">{board.nickname}</div>
                    <div className="table-cell">{board.createAt}</div>
                    <div className="table-cell">
                        <button className="board-edit" onClick={() => handleBoardClick(board)}>
                            <FaEdit />
                        </button>
                        <button className="board-delete" onClick={() => deleteBoard(board.id)}>
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">{selectedBoard ? "게시물 수정" : "게시물 추가"}</h2>
                            <button className="close-modal" onClick={closeModal}>✖</button>
                        </div>

                        {/* 카테고리 선택 */}
                        <select
                            name="category"
                            className="modal-input"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option value="0">공지사항</option>
                            <option value="1">성과</option>
                            <option value="2">정보</option>
                            <option value="3">후기</option>
                            <option value="4">활동</option>
                        </select>

                        <input
                            type="text"
                            name="title"
                            placeholder="제목"
                            className="modal-input"
                            value={formData.title}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            nickname="nickname"
                            placeholder="작성자"
                            className="modal-input"
                            value={formData.nickname}
                            onChange={handleChange}
                        />
                        <input
                            type="createAt"
                            name="createAt"
                            className="modal-input"
                            value={formData.createAt}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="tags"
                            placeholder="태그 (쉼표로 구분)"
                            className="modal-input"
                            value={formData.tags.join(", ")}
                            onChange={(e) =>
                                setFormData({ ...formData, tags: e.target.value.split(",").map(tag => tag.trim()) })
                            }
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="이미지 URL"
                            className="modal-input"
                            value={formData.image}
                            onChange={handleChange}
                        />
                        <textarea
                            name="content"
                            placeholder="내용 입력"
                            className="modal-input"
                            value={formData.content}
                            onChange={handleChange}
                        />

                        <div className="modal-buttons">
                            <button className="modal-cancel modal-button" onClick={closeModal}>
                                취소
                            </button>
                            <button
                                className="modal-accept modal-button"
                                onClick={selectedBoard ? editBoard : addBoard}
                            >
                                {selectedBoard ? "수정" : "추가"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BoardList;
