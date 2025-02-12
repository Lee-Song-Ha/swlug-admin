import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Notice from "./pages/notices/Notices";
import Blog from "./pages/blogs/Blogs";
import Login from "./pages/login/Login";
import ProtectedLayout from "./components/ProtectedLayout";

export default function App() {
    useEffect(() => {
        if (window.location.pathname === "/") {
            window.location.replace("/admin");
        }
    }, []);

    return (
        <Router basename="/admin">
            <Routes>
                {/* 로그인 페이지 */}
                <Route path="/login" element={<Login />} />

                {/* 보호된 레이아웃 (로그인 필요) */}
                <Route element={<ProtectedLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/notices" element={<Notice />} />
                    <Route path="/blogs" element={<Blog />} />
                </Route>
            </Routes>
        </Router>
    );
}
