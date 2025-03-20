import {
    BookOutlined,
    DollarOutlined,
    PieChartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const HeaderAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { Sider } = Layout;
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    const items = [
        getItem(<Link to="/admin">Dashboard</Link>, "1", <PieChartOutlined />),
        getItem(
            <Link to="/admin/user">Manage Users</Link>,
            "sub1",
            <UserOutlined />
        ),
        getItem(
            <Link to="/admin/book">Manage Books</Link>,
            "sub2",
            <BookOutlined />
        ),
        getItem(
            <Link to="/admin/order">Manage Orders</Link>,
            "sub3",
            <DollarOutlined />
        ),
    ];
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
        >
            <Menu
                style={{ height: "96vh" }}
                theme="light"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
            />
        </Sider>
    );
};

export default HeaderAdmin;
