import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./Header";

// 로그인 상태 확인
const ProtectedLayout = () => {
    const isAuthenticated = localStorage.getItem("userId"); // 로그인 확인

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="App">
            <Header />
            <div className="container">
                <Sidebar />
                <Outlet /> 
            </div>
        </div>
    );
};

export default ProtectedLayout;
