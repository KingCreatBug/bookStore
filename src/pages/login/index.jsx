import { Button, Form, Input, Divider } from "antd";
import "../register/register.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);

    const onFinish = (values) => {
        setIsSubmit(true);
        console.log("Success:", values);
        setIsSubmit(false);
    };
    return (
        <div className="register">
            <div className="register__wrap">
                <h1 className="register__title">Login</h1>
                <Divider />
                <Form onFinish={onFinish} layout="vertical" autoComplete="off">
                    <Form.Item
                        label="Email"
                        name="username"
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
                    Don't have an account{" "}
                    <Link className="register__text--link" to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
