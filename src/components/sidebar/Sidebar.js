import React from "react";
import { Link, useLocation } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import "../../style/sidebar.css";

function Sidebar() {

    const pathName = useLocation().pathname;

    const menus = [
        { name: "Home", path: "/"},
        { name: "Users", path: "/users"},
        { name: "Notice", path: "/notices"},
        { name: "Blog", path: "/blogs"}
    ];

    return (
        <div className="sidebar">
            {menus.map((menu, index) => {
                return (
                    <Link to={menu.path} key={index} className="sideItemList">
                        <SidebarItem
                            menu={menu}
                            // 현재 URL pathname과 객체에 담긴 path 값 일치 여부 확인
                            isActive={pathName === menu.path? true: false}
                        />
                    </Link>
                );
            })}
        </div>
    );
}

export default Sidebar;