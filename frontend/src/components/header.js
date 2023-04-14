import React from "react";
import { Space } from "antd";

const Header = () => {
  return (
    <div
      className="bg-dark card-container"
      style={{ width: "100%", padding: "10px" }}
    >
      <Space
        size="large"
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <div className="text-white">
          <strong>FREE MUSIC DOWNLOAD</strong>
        </div>
        <div className="text-white">Make your own playlist for free</div>
      </Space>
    </div>
  );
};

export default Header;
