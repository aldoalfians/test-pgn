import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select } from "antd";
import FormContainer from "../../components/FormContainer";
import FormGeneric from "../../components/FormGeneric";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";

export default function AddEmployeee() {
  const navigate = useNavigate();

  const [departement, setDepartement] = useState([]);

  useEffect(() => {
    getDepartement();
  }, []);

  const getDepartement = async () => {
    const response = await axios.get("/api/departement");
    setDepartement(response.data);
  };

  const onFinish = async (values) => {
    try {
      await axios.post("/api/employee", values);
      navigate("/employee");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const dataDepartement = departement.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Layout>
      <div>
        <FormContainer title={"Tambah Employeee"}>
          <FormGeneric goBackPathname={"/employee"} onFinish={onFinish}>
            <Form.Item name="name" label="Nama" rules={[{ required: true }]}>
              <Input placeholder="Masukan Nama Employee" />
            </Form.Item>
            <Form.Item
              name="departemenId"
              label="Departement"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Pilih Departement"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={dataDepartement}
              />
            </Form.Item>
          </FormGeneric>
        </FormContainer>
      </div>
    </Layout>
  );
}
