import { Button, Form, Input, Divider } from "antd";
import "./register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const onFinish = (values) => {
        setIsSubmit(true);
        console.log("Success:", values);
        setIsSubmit(false);
    };

    return (
        <div className="register">
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
