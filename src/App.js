import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Sidebar from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import Users from "./pages/users/Users";
import Notice from "./pages/notices/Notices";
import Blog from "./pages/blogs/Blogs";


export default function App() {
    useEffect(() => {
        if (window.location.pathname === "/") {
            window.location.replace("/admin");
        }
    }, []);

    return (
        <Router basename="/admin">
            <div className="App">
                <div className="container">
                    <Sidebar />
                    <Routes className="contents">
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/notices" element={<Notice />} />
                        <Route path="/blogs" element={<Blog />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}