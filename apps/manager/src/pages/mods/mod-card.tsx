import { Button, Flex } from "antd";
import type { Category, Mod } from "@amcs/core";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

interface Props {
  mod: Mod;
}

const CategoryIcon: React.FC<{ category: Category; size?: number }> = ({
  category,
  size = 16,
}) => {
  return (
    <img
      src={category.icon}
      alt={`category ${category.slug} icon`}
      width={size}
      height={size}
    />
  );
};

export const ModCard: React.FC<Props> = ({ mod }) => {
  const [actionsVisible, setActionsVisible] = useState(false);

  const categoryIcons = mod.categories.map((c) => (
    <CategoryIcon key={c.id} category={c} size={24} />
  ));

  return (
    <Flex className="mod-card">
      <Flex className="logo-container" justify="center" align="center">
        <img src={mod.logo} width={108} height={108} alt={`${mod.name} logo`} />
      </Flex>
      <Flex
        vertical
        flex={1}
        onMouseEnter={() => setActionsVisible(true)}
        onMouseLeave={() => setActionsVisible(false)}
      >
        <Flex align="center">
          <Flex className="names" flex={1}>
            <span>{mod.author}</span>
            <span> / </span>
            <span>{mod.name}</span>
          </Flex>
          <Flex
            className="actions"
            style={{ display: actionsVisible ? "flex" : "none" }}
          >
            <Button
              variant="solid"
              color="primary"
              size="small"
              icon={<DownloadOutlined />}
            >
              下载
            </Button>
            <Button
              variant="solid"
              color="orange"
              size="small"
              icon={<PlusOutlined />}
            >
              添加
            </Button>
          </Flex>
        </Flex>
        <Flex flex={1}>{mod.description}</Flex>
        <Flex>
          <Flex className="categories" flex={1}>
            {categoryIcons}
          </Flex>
          <Flex style={{ color: "gray" }} gap={4}>
            <span>#{mod.id}</span>
            <span>/</span>
            <span>@{mod.slug}</span>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
