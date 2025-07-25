import { Button, Flex } from "antd";
import { MdLogin, MdOutlineSettings } from "react-icons/md";
import { NavLink, Outlet } from "react-router";

import "./index.less";

const Home = () => {
  return (
    <div className="page home">
      <nav className="navigator-bar">
        <div className="site-name">
          <span>Modpack</span>
          <span>Manager</span>
        </div>
        <div className="links">
          <NavLink className="nav-link" to="/mods">
            <span>Mods</span>
          </NavLink>
          <NavLink className="nav-link" to="/modpacks">
            <span>Modpacks</span>
          </NavLink>
        </div>
        <div className="buttons">
          <Button variant="solid" color="primary">
            <Flex align="center" gap={8}>
              <MdLogin />
              登录
            </Flex>
          </Button>
          <Button shape="circle">
            <MdOutlineSettings size={18} />
          </Button>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
