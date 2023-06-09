import { Form, Input, Select } from "antd";
import FormContainer from "../../components/FormContainer";
import FormGeneric from "../../components/FormGeneric";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({});
  const [departement, setDepartement] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEmployeeId = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/employee/${id}`);
        setEmployeeData(response?.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      } finally {
        setLoading(false);
      }
    };
    getEmployeeId();
    getDepartement();
  }, [id]);

  const getDepartement = async () => {
    const response = await axios.get("/api/departement");
    setDepartement(response.data);
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      await axios.patch(`/api/employee/${id}`, values);
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
        {loading ? (
          "Loading..."
        ) : (
          <FormContainer>
            <FormGeneric goBackPathname={"/employee"} onFinish={onFinish}>
              <Form.Item
                name="name"
                label="Nama"
                rules={[{ required: true }]}
                initialValue={employeeData.name}
              >
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
        )}
      </div>
    </Layout>
  );
}
