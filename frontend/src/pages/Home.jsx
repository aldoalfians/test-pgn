import { Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { formatPrice, formatDate } from "../utils";

const { Title } = Typography;

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Departement",
    dataIndex: "departement",
    key: "departement",
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

export default function Home() {
  const [home, setHome] = useState([]);
  const [valueDepartement, setValueDepartement] = useState(null);
  const [valueEmployee, setValueEmployee] = useState(null);

  useEffect(() => {
    getspending();
  }, []);

  const getspending = async () => {
    const response = await axios.get("/api/home");
    setHome(response.data);
  };

  const allDepartement = home.map((item) => item.departement).flat(1);
  const departement = [...new Set(allDepartement.map((item) => item))];

  const allEmployee = home.map((item) => item.name).flat(1);
  const employee = [...new Set(allEmployee.map((item) => item))];

  const filterData = home?.filter((item) => {
    if (!valueDepartement && !valueEmployee) return true;

    return (
      item.name === valueEmployee ||
      item.departement === valueDepartement ||
      item.name === valueEmployee
    );
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
          options={departement}
          placeholder="Departement"
          setValue={setValueDepartement}
          options2={employee}
          placeholder2="Karyawan"
          setValue2={setValueEmployee}
        />
      </div>
    </Layout>
  );
}
