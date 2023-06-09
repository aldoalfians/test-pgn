import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DatePicker, Form, InputNumber, Select } from "antd";
import FormContainer from "../../components/FormContainer";
import FormGeneric from "../../components/FormGeneric";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { inputNumberCurrency } from "../../utils";

export default function AddSpending() {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    const response = await axios.get("/api/employee");
    setEmployee(response.data);
  };

  const onFinish = async (values) => {
    let reqBody = {
      employeeId: values.employeeId,
      date: values["date"].format("YYYY-MM-DD"),
      value: values.value,
    };

    try {
      await axios.post("/api/spending", reqBody);
      navigate("/spending");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  const dataSpending = employee.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <Layout>
      <div>
        <FormContainer title={"Tambah Spending"}>
          <FormGeneric goBackPathname={"/spending"} onFinish={onFinish}>
            <Form.Item
              name="employeeId"
              label="Nama"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Pilih Karyawan"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={dataSpending}
              />
            </Form.Item>
            <Form.Item name="date" label="Tanggal" rules={[{ required: true }]}>
              <DatePicker placeholder="Tanggal" format="YYYY-MM-DD" />
            </Form.Item>
            <Form.Item name="value" label="Jumlah" rules={[{ required: true }]}>
              <InputNumber
                {...inputNumberCurrency()}
                placeholder="Masukan Jumlah"
              />
            </Form.Item>
          </FormGeneric>
        </FormContainer>
      </div>
    </Layout>
  );
}
