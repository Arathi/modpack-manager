import { Checkbox, Collapse, Input, Pagination, Select, Segmented, type GetProps, type SelectProps, Button } from "antd";
import { useEffect, useState } from "react";
import type { Category } from "@amcs/core";

import ForgeOutlined from "@/assets/forge.svg?react";
import FabricOutlined from "@/assets/fabric.svg?react";
import QuiltOutlined from "@/assets/quilt.svg?react";
import NeoForgeOutlined from "@/assets/neoforge.svg?react";

import "./index.less";
import { SortAscendingOutlined } from "@ant-design/icons";

type ID = number | string;
type CheckboxGroupProps<T> = GetProps<typeof Checkbox.Group<T>>;
type Option<T> = {
  value: T;
  label: React.ReactNode;
};

enum ModLoader {
  Forge = 'forge',
  Fabric = 'fabric',
  Quilt = 'quilt',
  NeoForge = 'neoforge',
}

enum Source {
  CurseForge,
  Modrinth,
}

const Mods = () => {
  const [source, setSource] = useState<Source>(Source.CurseForge);
  const [minecraftVersion, setMinecraftVersion] = useState<string>();
  const [modLoaders, setModLoaders] = useState<ModLoader[]>([]);
  const [categoryIds, setCategoryIds] = useState<ID[]>([]);
  const [sortField, setSortField] = useState<string>("relevance");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [categories, setCategories] = useState<Category[]>([]);
  const [sortFields, setSortFields] = useState<Option<string>[]>([
    {
      value: "relevance",
      label: "相关性",
    },
    {
      value: "downloads",
      label: "下载量",
    },
    {
      value: "update-time",
      label: "更新时间",
    }
  ]);

  const [minecraftVersions, setMinecraftVersions] = useState<string[]>([
    "1.21.8",
    "1.21.6",
    "1.21.5",
    "1.21.1",
  ]);

  const minecraftVersionOptions: SelectProps['options'] = minecraftVersions.map(v => ({
    value: v,
    label: `Minecraft ${v}`,
  }));

  const modLoaderOptions: CheckboxGroupProps<ModLoader>['options'] = [{
    value: ModLoader.Forge,
    label: (
      <div className="mod-loader">
        <ForgeOutlined width={16} height={16} />
        <span>Forge</span>
      </div>
    ),
  }, {
    value: ModLoader.Fabric,
    label: (
      <div className="mod-loader">
        <FabricOutlined width={16} height={16} />
        <span>Fabric</span>
      </div>
    ),
  }, {
    value: ModLoader.Quilt,
    label: (
      <div className="mod-loader">
        <QuiltOutlined width={16} height={16} />
        <span>Quilt</span>
      </div>
    ),
  }, {
    value: ModLoader.NeoForge,
    label: (
      <div className="mod-loader">
        <NeoForgeOutlined width={16} height={16} />
        <span>NeoForge</span>
      </div>
    ),
  }];

  const categoryOptions: CheckboxGroupProps<ID>['options'] = [
  ];

  useEffect(() => {
    if (source === Source.CurseForge) {
      //
    } else if (source === Source.Modrinth) {
      //
    }
  }, [source]);

  return (
    <div className="page mods">
      <div className="left">
        <Segmented
          block
          options={[
            {
              value: Source.CurseForge,
              label: "CurseForge",
            },
            {
              value: Source.Modrinth,
              label: "Modrinth",
            },
          ]}
        />
        <Collapse
          className="collapse"
          bordered={false}
          defaultActiveKey={[
            "minecraft-versions",
            "mod-loaders",
            "categories"
          ]}
        >
          <Collapse.Panel header="Minecraft版本" key="minecraft-versions">
            <Select
              value={minecraftVersion}
              options={minecraftVersionOptions}
              onChange={(version) => {
                console.info("Minecraft版本过滤器发生变化：", version);
                setMinecraftVersion(version);
              }}
              placeholder="请选择"
              style={{
                width: "100%",
              }}
            />
          </Collapse.Panel>
          <Collapse.Panel header="模组加载器" key="mod-loaders">
            <Checkbox.Group
              options={modLoaderOptions}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onChange={(values) => {
                console.info("模组加载器过滤器发生变化：", values);
                setModLoaders(values);
              }}
            />
          </Collapse.Panel>
          <Collapse.Panel header="分类" key="categories">
            <Checkbox.Group
              options={categoryOptions}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onChange={(values) => {
                console.info("分类过滤器发生变化：", values);
                setCategoryIds(values);
              }}
            />
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className="right">
        <Input placeholder="关键字" />
        <div className="row">
          <Select options={sortFields} style={{ width: 128 }}/>
          <Button icon={<SortAscendingOutlined />} />
          <div className="remains">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mods;
