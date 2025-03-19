import { Button, Form, Input, Divider, message } from "antd";
import "../register/register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { callLogin } from "../../service/api";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";

const LoginPage = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async ({ username, password }) => {
        setIsSubmit(true);
        const res = await callLogin(username, password);
        dispatch(doLoginAction(res.data.user));
        setIsSubmit(false);
        if (res?.data) {
            messageApi.open({
                type: "success",
                content: "Login success",
            });
            localStorage.setItem("access_token", res.data.access_token);
            navigate("/");
        } else {
            messageApi.open({
                type: "error",
                content: "Please check your email or password",
            });
        }
    };
    return (
        <div className="register">
            {contextHolder}
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
