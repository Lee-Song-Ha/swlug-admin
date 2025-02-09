import axios from "axios";

// 모든 게시물 조회 (공지사항 & 블로그)
export const getAllBoards = async () => {
    try {
        const response = await axios.get(`/api/admin/boards`);
        return response.data;
    } catch (error) {
        throw new Error("게시물 조회 실패: " + error.message);
    }
};

// 게시물 추가 (공지사항 & 블로그 공통)
export const createBoard = async (boardData) => {
    try {
        await axios.post(`/api/admin/board/create`, boardData);
    } catch (error) {
        throw new Error("게시물 추가 실패: " + error.message);
    }
};

// 게시물 수정
export const updateBoard = async (boardData) => {
    try {
        await axios.post(`/api/admin/boards/mode`, boardData);
    } catch (error) {
        throw new Error("게시물 수정 실패: " + error.message);
    }
};

// 게시물 삭제
export const deleteBoard = async (boardId) => {
    try {
        await axios.post(`/api/admin/boards/delete`, { boardId });
    } catch (error) {
        throw new Error("게시물 삭제 실패: " + error.message);
    }
};
