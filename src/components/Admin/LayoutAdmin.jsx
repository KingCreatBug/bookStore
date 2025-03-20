import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderAdmin from "./HeaderAdmin";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import { callLogout } from "../../service/api";
import { doLogoutAction } from "../../redux/account/accountSlice";

const LayoutAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAdminRoute = window.location.pathname.startsWith("/admin");
    const user = useSelector((state) => state.account.user);
    const userRole = user?.role;

    const handleLogout = async () => {
        const res = await callLogout();
        if (res?.data) {
            dispatch(doLogoutAction());
            navigate("/");
        }
    };

    const items = [
        {
            key: "1",
            label: "Manage Account Admin",
        },
        {
            key: "2",
            label: "Logout",
        },
    ];

    return (
        <div className="layout-admin">
            {isAdminRoute && userRole === "ADMIN" && <HeaderAdmin />}
            <div className="layout-admin__content">
                {isAdminRoute && userRole === "ADMIN" && <FooterAdmin />}
                <div>
                    {isAdminRoute && userRole === "ADMIN" && (
                        <div className="layout-admin__top">
                            <Dropdown
                                menu={{
                                    items,
                                    onClick: ({ key }) => {
                                        if (key === "2") {
                                            handleLogout();
                                        }
                                    },
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <h1 className="layout-admin__title">
                                            Welcome {user?.fullName}
                                        </h1>
                                        <DownOutlined
                                            style={{ color: "#00d8ff" }}
                                        />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    )}

                    <Outlet />
                </div>
                {isAdminRoute && userRole === "ADMIN" && <FooterAdmin />}
            </div>
        </div>
    );
};

export default LayoutAdmin;
