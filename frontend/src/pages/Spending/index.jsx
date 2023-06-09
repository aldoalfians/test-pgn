import { Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { formatPrice, formatDate } from "../../utils";

const { Title } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tanggal",
    dataIndex: "date",
    key: "date",
    render: formatDate,
  },
  {
    title: "Jumlah",
    dataIndex: "value",
    key: "value",
    render: formatPrice,
  },
];

export default function Spending() {
  const [spending, setSpending] = useState([]);
  const [valueEmployee, setValueEmployee] = useState(null);

  useEffect(() => {
    getspending();
  }, []);

  const getspending = async () => {
    const response = await axios.get("/api/spending");
    setSpending(response.data);
  };



  const allEmployee = spending.map((item) => item.name).flat(1);
  const employee = [...new Set(allEmployee.map((item) => item))];

  const filterData = spending?.filter((item) => {
    if (!valueEmployee ) return true;

    console.log(item, "test");

    return item.name === valueEmployee;
  });

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Title level={2}>Data Spending</Title>
        <Table
          columns={columns}
          data={filterData}
          func={getspending}
          strDelete="spending"
          options={employee}
          placeholder="Karyawan"
          setValue={setValueEmployee}
        />
      </div>
    </Layout>
  );
}
