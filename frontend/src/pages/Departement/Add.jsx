import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import FormContainer from "../../components/FormContainer";
import FormGeneric from "../../components/FormGeneric";
import Layout from "../../components/Layout";

export default function AddDepartement() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await axios.post("/api/departement", values);
      navigate("/departement");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <Layout>
      <div>
        <FormContainer title={"Tambah Departement"}>
          <FormGeneric goBackPathname={"/departement"} onFinish={onFinish}>
            <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
              <Input placeholder="Masukan Nama Departement" />
            </Form.Item>
          </FormGeneric>
        </FormContainer>
      </div>
    </Layout>
  );
}
