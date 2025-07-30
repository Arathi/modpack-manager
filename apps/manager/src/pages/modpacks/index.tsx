import type { Modpack } from "@amcs/core";
import type { TableProps } from "antd";
import { Flex, Input, Select, Table } from "antd";
import { useEffect } from "react";

const Modpacks = () => {
  useEffect(() => {}, []);

  const columns: TableProps<Modpack>["columns"] = [
    {
      key: "id",
      title: "ID",
    },
    {
      key: "name",
      title: "名称",
    },
    {
      key: "game-version",
      title: "Minecraft版本",
      width: 120,
    },
    {
      key: "mod-loader",
      title: "加载器",
      width: 120,
    },
    {
      key: "actions",
      title: "操作",
      width: 120,
    },
  ];

  const modpacks: Modpack[] = [];

  return (
    <Flex vertical gap={8}>
      <Flex gap={8}>
        <Input placeholder="名称" />
        <Select placeholder="请选择Minecraft版本" />
        <Select placeholder="请选择模组加载器" />
      </Flex>
      <Table columns={columns} dataSource={modpacks} size="small" />
    </Flex>
  );
};

export default Modpacks;
