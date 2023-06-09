import { Button, Col, Form, Row, Space } from "antd";
import { FORM_LAYOUT, FORM_VALIDATE_MESSAGE } from "../utils/constant";
import { useNavigate } from "react-router-dom";

export default function FormGeneric({ onFinish, children, goBackPathname }) {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      {...FORM_LAYOUT}
      onFinish={onFinish}
      validateMessages={FORM_VALIDATE_MESSAGE}
    >
      {children}
      <Row justify="center">
        <Col>
          <Space>
            <Button type="primary" htmlType="submit">
              Simpan
            </Button>
            <Button type="default" onClick={() => navigate(goBackPathname)}>
              Batal
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
