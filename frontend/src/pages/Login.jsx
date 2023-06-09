import { Form, Input, Button, Card, Row, Col, Select } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/features/AuthSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  console.log(user);
  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <div className="LoginRoute__container">
      <Card className="LoginRoute__card">
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Form layout="horizontal" onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Masukan Username!" }]}
                style={{ marginBottom: 8 }}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  className="LoginRoute__input"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Masukan Password!" }]}
                style={{ marginBottom: 16 }}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  className="LoginRoute__input"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item name="role" rules={[{ required: true }]}>
                <Select
                  placeholder="Pilih Role"
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "admin",
                      label: "Admin",
                    },
                    {
                      value: "user",
                      label: "User",
                    },
                  ]}
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="LoginRoute__button"
              >
                Masuk
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}
