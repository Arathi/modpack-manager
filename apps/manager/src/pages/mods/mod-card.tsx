import type { Category, Version, Mod, ModLoader } from "@amcs/core";
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import type { GetProps, MenuProps, TableProps } from "antd";
import { Button, Dropdown, Flex, Modal, Select, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSnapshot } from "valtio";

import filterState from "@/store/search-mods-filter";
import siteState from "@/store/site";
import { modLoaderOptions } from "./options";

type DropdownButtonProps = GetProps<typeof Dropdown.Button>;

const CategoryIcon: React.FC<{ category: Category; size?: number }> = ({
  category,
  size = 16,
}) => {
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  return (
    <>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
      <div
        className="category-icon"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
      >
        <img
          src={category.icon}
          alt={`category ${category.slug} icon`}
          width={size}
          height={size}
        />
        <div
          className="category-details"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: hover ? "flex" : "none",
            flexDirection: "column",
            position: "fixed",
            left: position.x,
            top: position.y,
            padding: 8,
            color: "white",
            borderRadius: 8,
            gap: 8,
          }}
        >
          <span>{category.slug}</span>
          <span>{category.name}</span>
        </div>
      </div>
    </>
  );
};

interface Props {
  mod: Mod;
  className?: string;
  style?: React.CSSProperties;
}

export const ModCard: React.FC<Props> = ({ mod, className, style }) => {
  const siteSnap = useSnapshot(siteState);
  const filterSnap = useSnapshot(filterState);

  const [hover, setHover] = useState(false);
  const [downloadVisible, setDownloadVisible] = useState(false);
  const [versions, setVersions] = useState<Version[]>();
  const loading = useMemo(() => versions === undefined, [versions]);

  const [gameVersion, setGameVersion] = useState<string | undefined>(
    filterSnap.gameVersion,
  );
  const [modLoader, setModLoader] = useState<ModLoader | undefined>();

  useEffect(() => {
    //
  }, []);

  // #region 选项
  const gameVersionOptions = siteSnap.versionGroups.map((group) => {
    return {
      label: group.name,
      title: group.name,
      options: group.versions.map((version) => ({
        label: version.name,
        value: version.name,
      })),
    };
  });

  // 下载按钮组
  const downloadButtonProps = useMemo<DropdownButtonProps>(() => {
    // const props: DropdownButtonProps = {};
    // const items: MenuProps["items"] = [];
    // if (versions !== undefined) {
    //   versions.forEach((v) => {
    //     items.push({
    //       key: v.id,
    //       label: v.id,
    //     });
    //   });
    // }
    // items.push({
    //   key: "all",
    //   label: "其他版本",
    // });

    // return items;

    const items =
      versions?.map((version) => ({
        key: version.id,
        label: `版本-${version.id}`,
      })) ?? [];
    items.push({
      key: "all",
      label: "其他版本",
    });

    const menu: DropdownButtonProps["menu"] = {
      items,
      onClick: ({ key }) => {
        switch (key) {
          case "all":
            setDownloadVisible(true);
            break;
        }
      },
    };

    return {
      menu,
    } satisfies DropdownButtonProps;
  }, [versions]);
  // #endregion

  const versionColumns: TableProps<Version>["columns"] = [
    {
      key: "file-name",
      title: "文件名",
      dataIndex: "fileName",
    },
    {
      key: "publish-time",
      title: "发布时间",
      dataIndex: "publishedAt",
    },
    {
      key: "file-size",
      title: "文件大小",
      dataIndex: "fileSize",
    },
    {
      key: "downloads",
      title: "下载次数",
      dataIndex: "downloads",
    },
    {
      key: "actions",
      title: "操作",
      dataIndex: "id",
    },
  ];

  const categoryIcons = mod.categories.map((c) => (
    <CategoryIcon key={c.id} category={c} size={24} />
  ));

  function downloadLatest() {
    console.info("下载最新版");
  }

  return (
    <>
      <Flex
        className={["mod-card", className].join(" ")}
        style={style}
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
              onClick={() => {
                console.info("点击下载按钮");
              }}
              {...downloadButtonProps}
            >
              <Flex align="center" gap={8}>
                <DownloadOutlined />
                <span>下载</span>
              </Flex>
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
        onCancel={() => setDownloadVisible(false)}
        footer={null}
        width={"60vw"}
        height={"60vh"}
      >
        <Flex
          vertical
          gap={12}
          style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16 }}
        >
          <Flex gap={8}>
            <Select
              placeholder="请选择游戏版本"
              options={gameVersionOptions}
              value={gameVersion}
              allowClear
              style={{ flex: 1 }}
            />
            <Select
              placeholder="请选择模组加载器"
              options={modLoaderOptions}
              value={modLoader}
              allowClear
              style={{ flex: 1 }}
            />
          </Flex>
          <Table columns={versionColumns} dataSource={versions} size="small" />
        </Flex>
      </Modal>
    </>
  );
};
