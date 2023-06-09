import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, Form, InputNumber, Select } from "antd";
import FormContainer from "../../components/FormContainer";
import FormGeneric from "../../components/FormGeneric";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { convertToMoment, inputNumberCurrency } from "../../utils";

export default function EditSpending() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spendingData, setSpendingData] = useState({});
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSpendingId = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/spending/${id}`);
        setSpendingData(response?.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      } finally {
        setLoading(false);
      }
    };
    getSpendingId();
    getEmployee();
  }, [id]);

  const getEmployee = async () => {
    const response = await axios.get("/api/employee");
    setEmployee(response.data);
  };

  console.log(employee);
  const onFinish = async (values) => {
    let reqBody = {
      employeeId: values.employeeId,
      date: values["date"].format("YYYY-MM-DD"),
      value: values.value,
    };
    console.log(reqBody);
    try {
      await axios.patch(`/api/spending/${id}`, reqBody);
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
        {loading ? (
          "Loading..."
        ) : (
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
              <Form.Item
                name="date"
                label="Tanggal"
                rules={[{ required: true }]}
                initialValue={convertToMoment(spendingData?.date)}
              >
                <DatePicker placeholder="Tanggal" format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item
                name="value"
                label="Jumlah"
                rules={[{ required: true }]}
                initialValue={spendingData?.value}
              >
                <InputNumber
                  {...inputNumberCurrency()}
                  placeholder="Masukan Jumlah"
                />
              </Form.Item>
            </FormGeneric>
          </FormContainer>
        )}
      </div>
    </Layout>
  );
}
