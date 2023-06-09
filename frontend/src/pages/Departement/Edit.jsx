import { Form, Input } from "antd";
import FormContainer from "../../components/FormContainer";
import FormGeneric from "../../components/FormGeneric";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditDepartement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departementData, setDepartementData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDepartementId = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/departement/${id}`);
        setDepartementData(response?.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      } finally {
        setLoading(false);
      }
    };
    getDepartementId();
  }, [id]);

  const onFinish = async (values) => {
    try {
      await axios.patch(`/api/departement/${id}`, values);
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
        {loading ? (
          "Loading..."
        ) : (
          <FormContainer title={"Edit Data Departement"}>
            <FormGeneric goBackPathname={"/departement"} onFinish={onFinish}>
              <Form.Item
                name="name"
                label="Nama"
                rules={[{ required: true }]}
                initialValue={departementData?.name}
              >
                <Input />
              </Form.Item>
            </FormGeneric>
          </FormContainer>
        )}
      </div>
    </Layout>
  );
}
