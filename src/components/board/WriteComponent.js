import React, { useMemo, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import { updateBoard, createBoard } from "../../service/boardAPI";
import CKEditorComponent from "./CKEditorComponent"
import "../../style/write.css"

const WriteComponent = ({ onCancel, postToEdit, fetchBoards }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const _postToEdit = postToEdit || location.state?.post || null;
    const [post, setPost] = useState(null);
    
    const [id, setId] = useState(postToEdit?.id || null);
    const [boardTitle, setBoardTitle] = useState(_postToEdit?.boardTitle || "");
    const [nickname, setNickname] = useState(_postToEdit?.nickname || "");
    const [createdAt, setCreatedAt] = useState(_postToEdit?.createdAt || "");
    const [tag, setTag] = useState(_postToEdit?.tag || []);
    const [image, setImage] = useState(_postToEdit?.image || null);
    const [boardContents, setBoardContents] = useState(_postToEdit?.boardContents || "");

    const MAX_TAGS = 10;

    // boardType을 location 정보에 기반하여 계산 (공지사항과 블로그를 구분)
    const boardType = useMemo(() => {
        if (location.state?.boardType) {
        return location.state.boardType;
        }
        if (location.pathname.includes("/notices")) {
        return "notice";
        } else if (location.pathname.includes("/blogs")) {
        return "blog";
        }
        return "";
    }, [location.pathname, location.state?.boardType]);

  // 카테고리 state (게시판 수정 시 기존 값 사용)
  const [boardCategory, setBoardCategory] = useState(_postToEdit?.boardCategory || "");

    // boardType에 따라 선택 가능한 카테고리 옵션을 useMemo로 계산
    const boardOptions = useMemo(() => {
        if (boardType === "notice") {
        // 공지사항인 경우 고정 옵션
        return [<option value="0" key="0">공지사항</option>];
        }
        if (boardType === "blog") {
        // 블로그인 경우 선택 가능한 옵션
        return [
            <option value="" key="default">카테고리 선택</option>,
            <option value="1" key="1">성과</option>,
            <option value="2" key="2">정보</option>,
            <option value="3" key="3">후기</option>,
            <option value="4" key="4">활동</option>
        ];
        }
    return [];
  }, [boardType]);

    const categoryMapping = {
        "0": "공지사항",
        "1": "성과",
        "2": "정보",
        "3": "후기",
        "4": "활동",
    };

    const handleTagInput = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && e.target.value.trim() !== '') {
            e.preventDefault();
            const newTag = e.target.value.trim();
            if (tag.length >= MAX_TAGS) {
                return;
            }
            if (!tag.includes(newTag)) {
                setTag((prevTags) => [...prevTags, newTag]);
            }
            e.target.value = '';
        }
    };

    const handleTagRemove = (tagToRemove) => {
        setTag((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
    };

    const handleSubmit = async () => {
        if (!boardType) {
            alert("게시판 유형을 선택해주세요.");
            return;
          }
          if (!boardTitle || !boardContents) {
            alert("제목과 내용을 입력해주세요.");
            return;
          }
          if (boardType === "blogs" && !boardCategory) {
            alert("블로그 게시물의 카테고리를 선택해주세요.");
            return;
          }
        try {
            const postData = {
                id,
                boardCategory,
                boardTitle,
                nickname,
                createdAt,
                tag,
                image,
                boardContents,
            };

            if (postToEdit) {
                await updateBoard(postData);
                alert('게시물이 수정되었습니다.');
            } else {
                await createBoard(postData);
                alert('게시물이 등록되었습니다.');
            }
            fetchBoards(); // 등록 또는 수정 후 목록 갱신
        } catch (error) {
            console.error('글 등록/수정 실패:', error);
            alert('글 등록/수정에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="post-form">
            {/* boardType에 따라 카테고리 선택 렌더링 */}
            {boardType === "blog" && (
                <select
                value={boardCategory}
                onChange={(e) => setBoardCategory(e.target.value)}
                className="category-select"
                >
                {boardOptions}
                </select>
            )}
            {boardType === "notice" && (
                <div className="category-select">
                {categoryMapping["0"]}
                </div>
            )}

            <input
                type="text"
                placeholder="제목을 입력하세요"
                value={boardTitle}
                onChange={(e) => setBoardTitle(e.target.value)}
                className="title-input"
            />

            <CKEditorComponent boardContents={boardContents} setBoardContents={setBoardContents} />

            <div className="tag-input">
                <div className="tag-list">
                    {tag.map((tag, index) => (
                        <span key={index} className="tag">
                            #{tag}
                            <button className="remove-tag-button" onClick={() => handleTagRemove(tag)}>×</button>
                        </span>
                    ))}
                    {tag.length < MAX_TAGS && (
                        <input type="text" placeholder="#태그 입력" onKeyDown={handleTagInput} className="tag-input-field" />
                    )}
                </div>
            </div>
            <div className="buttons-container">
				<button className="submit-button" onClick={handleSubmit}>
                    {(_postToEdit && _postToEdit.id) ? '수정 완료' : '등록'}
				</button>
                <button className="close-button" onClick={onCancel}>
                    취소
                </button>
            </div>
        </div>
    );
};

export default WriteComponent;