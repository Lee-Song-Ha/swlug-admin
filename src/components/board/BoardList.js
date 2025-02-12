import React from "react";
import axios from "axios";
import "../../style/board.css";
import { FaEdit, FaTrash } from "react-icons/fa"; // 아이콘 추가

const BoardList = ({ boards, fetchBoards, setSelectedBoard }) => {

    const handleBoardClick = (board) => {
        console.log("게시물 클릭됨:", board);
        setSelectedBoard(board);
    };

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
            <div className="board-table-header">
                <div className="table-cell">카테고리</div>
                <div className="table-cell">제목</div>
                <div className="table-cell">작성자</div>
                <div className="table-cell">작성일</div>
                <div className="table-cell">관리</div>
            </div>

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
                        <button 
                            className="board-edit" 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                handleBoardClick(board); 
                            }}
                        >
                            <FaEdit />
                        </button>
                        <button 
                            className="board-delete" 
                            onClick={(e) => { 
                                e.stopPropagation(); 
                                deleteBoard(board.id); 
                            }}
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoardList;
