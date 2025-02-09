import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Notice from "./pages/notices/Notices";
import Blog from "./pages/blogs/Blogs";
import Header from "./components/Header";
import Login from "./pages/login/Login";

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

                {/* 관리자 페이지 */}
                <Route
                    path="/*"
                    element={
                        <div className="App">
                            <Header />
                            <div className="container">
                                <Sidebar />
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/users" element={<Users />} />
                                    <Route path="/notices" element={<Notice />} />
                                    <Route path="/blogs" element={<Blog />} />
                                </Routes>
                            </div>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}
