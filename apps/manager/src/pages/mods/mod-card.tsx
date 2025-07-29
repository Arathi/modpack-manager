import type { Version, Category, Mod } from "@amcs/core";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Flex,
  Modal,
  Select,
  type DropDownProps,
} from "antd";
import type { MenuProps } from "antd/lib";
import { useEffect, useMemo, useState } from "react";

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
  const [hover, setHover] = useState(false);
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [versions, setVersions] = useState<Version[]>();
  const loading = useMemo(() => versions === undefined, [versions]);

  useEffect(() => {
    //
  }, []);

  const categoryIcons = mod.categories.map((c) => (
    <CategoryIcon key={c.id} category={c} size={24} />
  ));

  const downloadButtons = useMemo(() => {
    const items: MenuProps["items"] = [];
    if (versions !== undefined) {
      versions.forEach((v) => {
        items.push({
          key: v.id,
          label: v.id,
        });
      });
    }
    items.push({
      key: "all",
      label: "其他版本",
    });
    return items;
  }, [versions]);

  function downloadLatest() {
    console.info("下载最新版");
  }

  return (
    <>
      <Flex
        className="mod-card"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Flex justify="center" align="center" style={{ marginRight: 8 }}>
          <img
            src={mod.logo}
            width={108}
            height={108}
            alt={`${mod.name} logo`}
          />
        </Flex>
        <Flex vertical flex={1}>
          <Flex className="names">
            <span>{mod.author}</span>
            <span> / </span>
            <span>{mod.name}</span>
          </Flex>
          <Flex flex={1}>{mod.description}</Flex>
          <Flex>
            <Flex className="categories" flex={1}>
              {categoryIcons}
            </Flex>
          </Flex>
        </Flex>
        <div
          className="overlay"
          style={{
            position: "relative",
            width: 0,
            display: hover ? "flex" : "none",
          }}
        >
          <Flex
            vertical
            gap={8}
            flex={1}
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            <Dropdown.Button
              type="primary"
              menu={{
                items: downloadButtons,
                onClick: ({ key }) => {
                  console.info("点击下载按钮", key);
                  if (key === "all") {
                    setDownloadVisible(true);
                  }
                },
              }}
              onClick={() => downloadLatest()}
            >
              下载
            </Dropdown.Button>
            <Button
              variant="solid"
              color="primary"
              icon={<DownloadOutlined />}
              onClick={() => {
                console.info("点击下载按钮");
              }}
              style={{ display: "none" }}
            >
              下载
            </Button>
            <Button
              variant="solid"
              color="orange"
              icon={<PlusOutlined />}
              onClick={() => {
                console.info("点击添加按钮");
              }}
            >
              添加
            </Button>
          </Flex>
          <Flex
            gap={4}
            justify="end"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              color: "gray",
              width: 800,
            }}
          >
            <span>#{mod.id}</span>
            <span>/</span>
            <span>@{mod.slug}</span>
          </Flex>
        </div>
      </Flex>
      <Modal
        title={
          <Flex style={{ paddingLeft: 16, paddingRight: 16 }}>
            <h2>下载 {mod.name}</h2>
          </Flex>
        }
        open={downloadVisible}
        centered
        onOk={() => setDownloadVisible(false)}
        onCancel={() => setDownloadVisible(false)}
        footer={null}
      >
        <Flex
          vertical
          gap={12}
          style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}
        >
          <Select placeholder="请选择游戏版本" />
          <Select placeholder="请选择模组加载器" />
        </Flex>
      </Modal>
    </>
  );
};
