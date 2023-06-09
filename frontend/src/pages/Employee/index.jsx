import { Typography } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import Table from "../../components/Table";

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
];

export default function Employee() {
  const [employee, setEmployee] = useState([]);
  const [valueDepartement, setValueDepartement] = useState(null);

  useEffect(() => {
    getEmployee();
  }, []);

  const getEmployee = async () => {
    const response = await axios.get("/api/employee");
    setEmployee(response.data);
  };

  const allDepartement = employee.map((item) => item.departement).flat(1);
  const departement = [...new Set(allDepartement.map((item) => item))];

  const filterData = employee?.filter((item) => {
    if (!valueDepartement) return true;

    return item.departement === valueDepartement;
  });

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Title level={2}>Data Employee</Title>

        <Table
          columns={columns}
          data={filterData}
          func={getEmployee}
          strDelete="employee"
          options={departement}
          placeholder="Departement"
          setValue={setValueDepartement}
        />
      </div>
    </Layout>
  );
}
