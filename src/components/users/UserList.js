import React, { useState } from "react";
import axios from "axios";
import "../../style/userlist.css"
import "../../style/modal.css"
import { FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa"; // 아이콘 추가

const UserList = ({ users, fetchUsers, isModalOpen, setIsModalOpen }) => {
    // 모달 열림 상태 관리
    const [selectedUser, setSelectedUser] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        userId: "",
        pw: "",
        nickname: "",
        email: "",
        phone: "",
        roleType: "",
    });

    // 셸 클릭 시 모달 열기
    const handleNoticeClick = (userId) => {
        setSelectedUser(userId);
        setFormData(
            userId || {
                userId: "",
                pw: "",
                nickname: "",
                email: "",
                phone: "",
                roleType: "",
            }
        );
        setIsModalOpen(true);
    };

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 비밀번호 표시/숨기기 토글
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    // 모달 외부 클릭 시 모달 닫기
    const handleOverlayClick = (e) => {
        // 클릭된 영역이 모달 콘텐츠가 아니면 모달을 닫습니다.
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    // 회원 추가 API 호출
    const addUser = async () => {
        try {
            await axios.post("/users/create", formData);
            alert("회원이 추가되었습니다.");
            fetchUsers(); // 새로고침
            closeModal();
        } catch (error) {
            alert("회원 추가 실패");
            console.error(error);
        }
    };

    // 회원 수정 API 호출
    const editUser = async () => {
        try {
            await axios.post("/users/mode", formData);
            alert("회원 정보가 수정되었습니다.");
            fetchUsers();
            closeModal();
        } catch (error) {
            alert("회원 수정 실패");
            console.error(error);
        }
    };

    // 회원 삭제 API 호출
    const deleteUser = async (userId) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axios.post("/users/delete", { userId });
            alert("회원이 삭제되었습니다.");
            fetchUsers();
        } catch (error) {
            alert("회원 삭제 실패");
            console.error(error);
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
                <div className="table-cell">Actions</div>
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
                    <div className="table-cell">
                        <button
                            className="user-edit"
                                onClick={() => handleNoticeClick(user)}
                            >
                                <FaEdit />
                        </button>
                        <button className="user-delete"
                            onClick={() => deleteUser(user.userId)}
                            >                            
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
                            <h2 className="modal-title">{selectedUser ? "회원 수정" : "회원 추가"}</h2>
                            <button className="close-modal" onClick={closeModal}>✖</button>
                        </div>

                        <input
                            type="text"
                            name="userId"
                            placeholder="User ID"
                            className="modal-input"
                            value={formData.userId}
                            onChange={handleChange}
                            disabled={!!selectedUser}
                        />

                        {!selectedUser && (
                            <div className="input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="pw"
                                    placeholder="Password"
                                    className="modal-input"
                                    value={formData.pw}
                                    onChange={handleChange}
                                />
                                <span className="password-toggle" onClick={togglePasswordVisibility}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        )}

                        <input
                            type="text"
                            name="nickname"
                            placeholder="Nickname"
                            className="modal-input"
                            value={formData.nickname}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="modal-input"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            className="modal-input"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="roleType"
                            placeholder="RoleType"
                            className="modal-input"
                            value={formData.roleType}
                            onChange={handleChange}
                        />

                        <div className="modal-buttons">
                            <button className="modal-cancel modal-button" onClick={closeModal}>
                                Cancel
                            </button>
                            <button
                                className="modal-accept modal-button"
                                onClick={selectedUser ? editUser : addUser}
                            >
                                {selectedUser ? "Update" : "Accept"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;