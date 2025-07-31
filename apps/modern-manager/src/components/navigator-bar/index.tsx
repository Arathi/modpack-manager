import { NavLink } from "@modern-js/runtime/router";
import { Avatar, Button } from "antd";
import { FiSettings } from "react-icons/fi";

import { BsBox, BsBoxes } from "react-icons/bs";

import logo from "@/assets/modpack-manager-logo-4.png";
import "./index.less";

const NavigatorBar = () => {
  function rend() {
    //
  }

  return (
    <nav className="navigator-bar">
      <div className="logo">
        <img src={logo} alt="logo modpack-manager" width={48} height={48} />
      </div>
      <div className="links" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 16, flex: 1 }}>
        <NavLink to="/mods">
          <BsBox />
          <span>模组</span>
        </NavLink>
        <NavLink to="/modpacks">
          <BsBoxes />
          <span>整合包</span>
        </NavLink>
      </div>
      <div className="actions" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Avatar>A</Avatar>
        <Button shape="circle">
          <FiSettings />
        </Button>
      </div>
    </nav>
  );
}

export default NavigatorBar;
