import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { registerRequest } from "../../redux/auth/reducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(registerRequest(values));
  };

  return (
    <div
      style={{
        height: "87vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        background: "#232121",
      }}
    >
      <Form
        name="basic"
        layout="vertical"
        style={{ width: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={<span className="text-primary ">Username</span>}
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"email"}
          label={<span className="text-primary ">Email</span>}
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={<span className="text-primary ">Password</span>}
          name="password"
          className="text-primary "
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <p className="text-primary ">
          Do you have account already?.{" "}
          <Button
            type="link"
            onClick={() => navigate("/login")}
            className="p-0"
          >
            Login
          </Button>
        </p>
      </Form>
    </div>
  );
};
export default Login;
