import { Button, Form, Input, Divider, notification } from "antd";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callRegister } from "../../service/api";

const RegisterPage = () => {
    const [api, contextHolder] = notification.useNotification();
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();

    const onFinish = async ({ fullName, email, password, phone }) => {
        setIsSubmit(true);
        const res = await callRegister(fullName, email, password, phone);
        setIsSubmit(false);
        if (res?.data) {
            api.success({
                message: "Register Success",
                description: "Go to login page",
            });
            navigate("/login");
        } else {
            api.error({
                message: "Register Success",
                description:
                    res.message && Array.isArray(res.message)
                        ? res.message[0]
                        : res.message,
                duration: 5,
            });
        }
    };

    return (
        <div className="register">
            {contextHolder}
            <div className="register__wrap">
                <h1 className="register__title">Register</h1>
                <Divider />
                <Form onFinish={onFinish} layout="vertical" autoComplete="off">
                    <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: "Please input your full name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                            {
                                min: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Please input your phone!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={isSubmit}
                            type="primary"
                            htmlType="submit"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <Divider>or</Divider>
                <p className="register__text">
                    Already have an account?{" "}
                    <Link className="register__text--link" to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
