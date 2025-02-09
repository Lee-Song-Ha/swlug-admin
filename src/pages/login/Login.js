import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/login.css"

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 폼 유효성 검사
  useEffect(() => {
    setIsFormValid(id.trim() !== "" && password.trim() !== "");
  }, [id, password]);

  // 로그인 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setError(""); // 기존 오류 초기화

    try {
      const response = await axios.post("/api/login", {
        userId: id,
        password: password,
      });

      if (response.data.success) {
        // 로그인 성공 시 로컬 스토리지에 저장
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("roleType", response.data.roleType); // roleType 저장

        // 관리자 페이지 이동 (roleType 체크 가능)
        if (response.data.roleType === "1") {
          navigate("/", { replace: true });
        } else {
          navigate("/error", { replace: true });
        }

        window.scrollTo(0, 0);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
        <img
            src="/Logo4.jpeg"
            alt="SWLUG Logo"
            className="login_logo"
        />
        <form className="login-form" onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder=" 아이디를 입력해주세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="info-form_input"
          />
          <input
              type="password"
              placeholder=" 비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="info-form_input"
          />
          {error && <p className="error-message">{error}</p>}
          <button
              type="submit"
              className={`btn_next ${isFormValid ? 'active' : ''}`}
              disabled={loading || !isFormValid}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
  );
}

export default Login;
