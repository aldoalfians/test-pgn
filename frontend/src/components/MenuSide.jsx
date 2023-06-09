import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const items = [
  { label: "Home", key: "/" },
  { label: "Employee", key: "/employee" },
  { label: "Departement", key: "/departement" },
  { label: "Spending", key: "/spending" },
];

export default function MenuSide() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedKey, setSelectedKey] = useState(
    items.find((_item) => _item.key === location.pathname)?.key
  );

  const handleMenuClick = ({ key }) => {
    if (key) {
      navigate(key);
    }
  };

  useEffect(() => {
    setSelectedKey(items.find((_item) => _item.key === location.pathname)?.key);
  }, [location]);

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      items={items}
      onClick={handleMenuClick}
    />
  );
}
