import { Avatar, Button, Flex } from "antd";
import { BsBox, BsBoxes } from "react-icons/bs";
import { Outlet } from "react-router";

import type { LinkProps } from "@/components/navigator-bar";
import { NavigatorBar } from "@/components/navigator-bar";
import { IoSettingsOutline } from "react-icons/io5";
import { Settings } from "@/components/settings";
import { useEffect } from "react";
import { init } from "@/store";
import { init as initSiteState } from "@/store/site";

const Root = () => {
  const links: LinkProps[] = [
    {
      key: "mods",
      to: "/mods",
      icon: <BsBox />,
      text: "模组",
    },
    {
      key: "modpacks",
      to: "/modpacks",
      icon: <BsBoxes />,
      text: "整合包",
    },
  ];

  useEffect(() => {
    init();
    initSiteState();
  }, []);

  return (
    <Flex vertical>
      <NavigatorBar
        links={links}
        suffix={
          <Flex gap={8}>
            <Avatar>A</Avatar>
            <Settings />
          </Flex>
        }
      />
      <Outlet />
    </Flex>
  );
};

export default Root;
