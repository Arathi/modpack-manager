import {
  Checkbox,
  Collapse,
  Flex,
  Input,
  Select,
  type CollapseProps,
} from "antd";
import { useSnapshot } from "valtio";

import { SourceSelect } from "@/components/source-select";
import filterState from "@/store/search-mods-filter";
import siteState from "@/store/site";
import GameVersionSelect from "@/components/game-version-select";
import { modLoaderOptions } from "../mods/options";
import type { Category, ModLoader } from "@amcs/core";
import type { SearchModsFilter } from "@/domains/search-mods-filter";
import { SearchOutlined } from "@ant-design/icons";
import CategoryCheckbox from "@/components/category-checkbox";

const SearchMods = () => {
  const filterSnap = useSnapshot(filterState);
  const siteSnap = useSnapshot(siteState);

  const categoryCheckboxes: React.ReactNode[] =
    siteSnap.curseforgeCategories.map((cat) => (
      <CategoryCheckbox key={cat.id} data={cat as Readonly<Category>} />
    ));

  const panels: CollapseProps["items"] = [
    {
      key: "game-version",
      label: "Minecraft 版本",
      children: (
        <GameVersionSelect
          groups={[
            {
              name: "Minecraft 1.21",
              versions: [
                "1.21.8",
                "1.21.7",
                "1.21.6",
                "1.21.5",
                "1.21.4",
                "1.21.3",
                "1.21.2",
                "1.21.1",
                "1.21",
              ],
            },
            {
              name: "Minecraft 1.20",
              versions: [
                "1.20.5",
                "1.20.4",
                "1.20.3",
                "1.20.2",
                "1.20.1",
                "1.20",
              ],
            },
          ]}
          value={filterSnap.gameVersion}
          onChange={(value) => {
            console.info("切换Minecraft版本：", value);
            filterState.gameVersion = value;
          }}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      key: "mod-loaders",
      label: "模组加载器",
      children: (
        <Checkbox.Group
          options={modLoaderOptions}
          style={{ display: "flex", flexDirection: "column" }}
          value={
            filterSnap.modLoaders as Readonly<SearchModsFilter>["modLoaders"]
          }
          onChange={(values) => {
            console.info("选取模组加载器：", values);
            filterState.modLoaders = values;
          }}
        />
      ),
    },
    {
      key: "categories",
      label: "模组分类",
      children: (
        <Checkbox.Group style={{ display: "flex", flexDirection: "column" }}>
          {categoryCheckboxes}
        </Checkbox.Group>
      ),
    },
  ];

  return (
    <Flex className="search-mods-page" gap={8}>
      <Flex vertical className="filter-aside" gap={8}>
        <SourceSelect
          value={filterSnap.source}
          onChange={(value) => {
            console.info("切换模组源：", value);
            filterState.source = value;
          }}
        />
        <Collapse
          className="filter-collapse"
          defaultActiveKey={["game-version", "mod-loaders", "categories"]}
          expandIconPosition="end"
          items={panels}
          bordered={false}
          style={{ backgroundColor: "#ffffff" }}
        />
      </Flex>
      <Flex vertical className="main" style={{ flex: 1 }}>
        <Input
          prefix={<SearchOutlined style={{ color: "#BFBFBF" }} />}
          placeholder="关键字"
        />
      </Flex>
    </Flex>
  );
};

export default SearchMods;
