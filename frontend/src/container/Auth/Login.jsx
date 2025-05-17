import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
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
          label={<span className="text-primary ">Password</span>}
          name="password"
          className="text-primary "
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <p className="text-primary ">
          If you don't have account, Create new account.{" "}
          <Button
            type="link"
            onClick={() => navigate("/register")}
            className="p-0"
          >
            Register
          </Button>
        </p>
      </Form>
    </div>
  );
};
export default Login;
