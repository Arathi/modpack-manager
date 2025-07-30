import type { Version } from "@amcs/core";
import { DownloadOutlined } from "@ant-design/icons";
import type { GetProps, MenuProps } from "antd";
import { Dropdown, Flex } from "antd";

type Props = GetProps<typeof Dropdown.Button> & {
  versions?: Array<Version>;
};

// type MenuItems = MenuProps["items"];

export const DownloadButtons: React.FC<Props> = (props) => {
  const menu: MenuProps = {
    items: [],
    onClick: ({ key }) => {
      onMenuClick(key);
    },
  };

  function onMenuClick(key: string) {
    switch (key) {
      case "all":
        break;
    }
  }

  return (
    <Dropdown.Button {...props} menu={menu}>
      <Flex align="center" gap={8}>
        <DownloadOutlined />
        <span>下载</span>
      </Flex>
    </Dropdown.Button>
  );
};
