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
];

export default function Departement() {
  const [departement, setDepartement] = useState([]);

  useEffect(() => {
    getDepartement();
  }, []);

  const getDepartement = async () => {
    const response = await axios.get("/api/departement");
    setDepartement(response.data);
  };

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Title level={2}>Data Departement</Title>
        <Table
          columns={columns}
          data={departement}
          func={getDepartement}
          strDelete="departement"
        />
      </div>
    </Layout>
  );
}
