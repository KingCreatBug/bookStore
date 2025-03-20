import "./header.scss";
import logo from "../../assets/react.svg";
import {
    FileSearchOutlined,
    ShoppingCartOutlined,
    DownOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import { Badge, Dropdown, Space, Drawer, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callLogout } from "../../service/api";
import { doLogoutAction } from "../../redux/account/accountSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState(0);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const user = useSelector((state) => state.account.user);
    const isAuthenticated = useSelector(
        (state) => state.account.isAuthenticated
    );

    const items = [
        {
            key: "1",
            label: "My Account",
        },
        {
            key: "2",
            label: "Logout",
        },
    ];

    const handleLogout = async () => {
        const res = await callLogout();
        if (res?.data) {
            dispatch(doLogoutAction());
            navigate("/");
        }
    };

    return (
        <div className="header">
            <div className="header__wrap">
                <img src={logo} alt="" />
                <h1 className="header__title">Book Store</h1>
            </div>
            <button
                onClick={() => setIsOpenDrawer(true)}
                className="header__menu"
            >
                <MenuOutlined />
            </button>
            <div className="header__search">
                <FileSearchOutlined className="header__search--icon" />
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    className="header__search--input"
                    type="text"
                    placeholder="Do you like read book to day"
                />
            </div>

            <div className="header__account">
                <Badge
                    className="header__account--cart"
                    count={cart}
                    showZero
                    size="small"
                >
                    <ShoppingCartOutlined className="header__account--icon" />
                </Badge>
                <div className="header__account--login">
                    {isAuthenticated ? (
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
                                    <p className="header__account--name">
                                        welcome {user?.fullName}
                                    </p>
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    ) : (
                        <Link to="/login" className="header__account--text">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            <Drawer
                title="Menu Function"
                placement="left"
                closable={true}
                onClose={() => setIsOpenDrawer(false)}
                open={isOpenDrawer}
            >
                <p className="header-drawer__text">Manage Account</p>
                <Divider />
                <button onClick={handleLogout} className="header-drawer__text">
                    Logout
                </button>
            </Drawer>
        </div>
    );
};

export default Header;
