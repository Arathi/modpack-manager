import { Button } from "antd";
import { NavLink, Outlet } from "react-router";

import "./index.less";
import { LoginOutlined, SettingOutlined } from "@ant-design/icons";

const Home = () => {
  return (
    <div className="page home">
      <nav className="navigator-bar">
        <div className="site-name">
          <span>Modpack</span>
          <span>Manager</span>
        </div>
        <div className="links">
          <NavLink className="" to="/mods">Mods</NavLink>
          <NavLink className="" to="/modpacks">Modpacks</NavLink>
        </div>
        <div className="buttons">
          <Button variant="solid" color="primary" icon={<LoginOutlined />}>登录</Button>
          <Button shape="circle" icon={<SettingOutlined />} />
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
};

export default Home;
