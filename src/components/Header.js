import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import "../style/header.css"; 

function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header className="header">
            <div className="header-left">
                <img src="/swlug.png" alt="로고" className="logo" />
            </div>
            <div className="header-right">
                <button className="logout-button" onClick={handleLogout}>
                    <IoIosLogOut className="logout-icon" />
                </button>
            </div>
        </header>
    );
}

export default Header;
