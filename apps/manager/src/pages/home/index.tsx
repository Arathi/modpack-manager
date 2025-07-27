import { Button, Flex } from "antd";
import { MdLogin } from "react-icons/md";
import { NavLink, Outlet, useNavigate, useNavigation } from "react-router";
import { BsBox, BsBoxes } from "react-icons/bs";
import { useEffect } from "react";

import { Settings } from "./settings";
import { init } from "@/store";

import "./index.less";

const Home = () => {
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="page home">
      <nav className="navigator-bar">
        <div className="site-name">
          <span>Modpack</span>
          <span>Manager</span>
        </div>
        <div className="links">
          <NavLink
            className={({isActive}) => isActive ? "active" : ""}
            to="/mods"
          >
            <BsBox />
            <span>Mods</span>
          </NavLink>
          <NavLink
            className={({isActive}) => isActive ? "active" : ""}
            to="/modpacks"
          >
            <BsBoxes />
            <span>Modpacks</span>
          </NavLink>
        </div>
        <div className="buttons">
          <Button variant="solid" color="primary">
            <Flex align="center" gap={8}>
              <MdLogin />
              <span>登录</span>
            </Flex>
          </Button>
          <Settings />
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
