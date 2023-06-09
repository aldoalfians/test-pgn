import { Button, Col, Row, Select, Space, Table as TableAntd } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Table({
  columns,
  data,
  strDelete,
  func,
  options,
  options2,
  setValue,
  setValue2,
  placeholder,
  placeholder2,
}) {
  const { user } = useSelector((state) => state.auth);

  const { pathname } = useLocation();

  const deleteRecords = async (records) => {
    await axios.delete(`/api/${strDelete}/${records.id}`);
    func();
  };

  const onChangeValue = (value) => {
    setValue(value);
  };

  const onChangeValue2 = (value) => {
    setValue2(value);
  };

  const navigate = useNavigate();
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row gutter={[8, 8]} justify="end">
          {pathname === "/" && (
            <Col>
              <Select
                style={{
                  width: 200,
                }}
                allowClear
                placeholder={placeholder2}
                options={options2?.map((item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={onChangeValue2}
              />
            </Col>
          )}
          {(pathname === "/" ||
            pathname === "/employee" ||
            pathname === "/spending") && (
            <Col>
              <Select
                style={{
                  width: 200,
                }}
                allowClear
                placeholder={placeholder}
                options={options?.map((item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={onChangeValue}
              />
            </Col>
          )}
          <Col>
            {pathname !== "/" && (
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => navigate("./add")}
              >
                Tambah
              </Button>
            )}
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <TableAntd
          scroll={{ x: true }}
          size="middle"
          columns={[
            {
              width: 50,
              title: "No",
              dataIndex: "no",
              key: "no",
              onCell() {
                return { style: { textAlign: "center" } };
              },
              onHeaderCell() {
                return { style: { textAlign: "center" } };
              },
              render(_, __, index) {
                ++index;
                return index;
              },
            },
            ...columns,
            {
              width: 88,
              key: "action",
              fixed: "right",
              render: (_, records) => (
                <>
                  {user.role === "admin" && (
                    <Space>
                      <Button
                        shape="circle"
                        type="text"
                        onClick={() => navigate(`./${records.id}`)}
                        icon={<EditOutlined />}
                      />
                      <Button
                        shape="circle"
                        type="text"
                        htmlType="button"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => deleteRecords(records)}
                      />
                    </Space>
                  )}
                </>
              ),
            },
          ]}
          dataSource={data}
        />
      </Col>
    </Row>
  );
}
