import { Button, Layout as LayoutAntd, Row } from "antd";
import { useDispatch } from "react-redux";
import MenuSide from "./MenuSide";
import { logout } from "../redux/features//AuthSlice";
import { useNavigate } from "react-router-dom";

const { Content, Footer, Header, Sider } = LayoutAntd;

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <LayoutAntd
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider style={{ background: "var(--white-color)" }}>
        <div style={{ marginTop: 64 }}>
          <MenuSide />
        </div>
      </Sider>
      <LayoutAntd>
        <Header
          style={{
            padding: 0,
            background: "var(--white-color)",
          }}
        >
          <Row justify="end" align="middle" style={{ paddingRight: 32 }}>
            <div>
              <Button type="primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Row>
        </Header>
        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "var(--white-color)",
          }}
        >
          <span>
            ©{new Date().getFullYear().toString()}
            <strong>aldoalfians</strong>. All Rights Reserved
          </span>
        </Footer>
      </LayoutAntd>
    </LayoutAntd>
  );
}
