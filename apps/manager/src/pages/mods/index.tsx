import type { Category, Mod } from "@amcs/core";
import { ModLoader, SortRule, SortRuleNames, Source } from "@amcs/core";
import { SearchOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Collapse,
  Flex,
  Input,
  Pagination,
  Segmented,
  Select,
  Spin,
  type GetProps,
  type SelectProps,
  type SegmentedProps,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { subscribe, useSnapshot } from "valtio";

import { adapter as curseforge } from "@/utils/curseforge";
import filterState from "@/store/search-mods-filter";
import siteState from "@/store/site";
import { ModCard } from "./mod-card";
import { modLoaderOptions } from "./options";

import CurseForgeLogo from "@/assets/curseforge.svg?react";
import ModrinthLogo from "@/assets/modrinth.svg?react";

import "./index.less";

type CategoryID = Category["id"];

const CategoryCheckbox: React.FC<{
  category: Category;
  level?: number;
  className?: string;
  style?: GetProps<typeof Checkbox>["style"];
}> = ({ category, className, level = 0, style }) => {
  const classNames = ["category-checkbox", className];
  let icon: React.ReactNode;
  if (category.icon.startsWith("<svg") && category.icon.endsWith("</svg>")) {
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    icon = <div dangerouslySetInnerHTML={{ __html: category.icon }} />;
  } else if (
    category.icon.startsWith("https://") &&
    category.icon.endsWith(".png")
  ) {
    icon = (
      <img src={category.icon} alt={category.name} width={16} height={16} />
    );
  }

  return (
    <Checkbox
      className={classNames.join(" ")}
      value={category.id}
      style={{
        ...style,
        paddingLeft: level * 12,
      }}
    >
      <Flex align="center" gap={8}>
        {icon}
        <span>{category.name}</span>
      </Flex>
    </Checkbox>
  );
};

const Mods = () => {
  const siteSnap = useSnapshot(siteState);
  const filterSnap = useSnapshot(filterState);

  const [results, setResults] = useState<Mod[]>([]);
  const [total, setTotal] = useState(0);

  const source = filterSnap.source;
  const inCurseForge = source === Source.CurseForge;
  const inModrinth = source === Source.Modrinth;
  const categories =
    source === Source.CurseForge
      ? siteSnap.curseforgeCategories
      : siteSnap.modrinthCategories;

  useEffect(() => {
    const unsubscribe = subscribe(filterState, () => {
      console.info("模组搜索过滤器发生变化：", filterState);
      curseforge.searchMods(filterState).then((resp) => {
        setResults(resp.data);
        setTotal(resp.page.total);
      });
    });

    return () => unsubscribe();
  }, []);

  // #region 选项
  // 源
  const sourceOptions: SegmentedProps<Source>["options"] = [
    {
      value: Source.CurseForge,
      label: (
        <div className="source-option">
          <CurseForgeLogo />
          <span>CurseForge</span>
        </div>
      ),
    },
    {
      value: Source.Modrinth,
      label: (
        <div className="source-option">
          <ModrinthLogo />
          <span>Modrinth</span>
        </div>
      ),
    },
  ];

  // Minecraft版本
  const gameVersionOptions: SelectProps<string>["options"] =
    siteSnap.versionGroups.map((group) => {
      return {
        label: group.name,
        title: group.name,
        options: group.versions.map((version) => ({
          label: version.name,
          value: version.name,
        })),
      };
    });

  // ModLoader

  // 分类
  const categoryOptions: React.ReactNode[] = [];
  function addCategoryOptions(categories: Category[] = [], level: number = 0) {
    for (const category of categories) {
      categoryOptions.push(
        <CategoryCheckbox
          key={category.id}
          category={category}
          level={level}
        />,
      );
      if (category.children !== undefined && category.children.length > 0) {
        addCategoryOptions(category.children, level + 1);
      }
    }
  }
  addCategoryOptions(categories as Category[]);

  // 排序规则
  const sortRuleOptions = [
    {
      value: SortRule.Popularity,
      label: SortRuleNames[SortRule.Popularity],
    },
    {
      value: SortRule.Updated,
      label: SortRuleNames[SortRule.Updated],
    },
    {
      value: SortRule.Created,
      label: SortRuleNames[SortRule.Created],
    },
    {
      value: SortRule.Downloads,
      label: SortRuleNames[SortRule.Downloads],
    },
    // 仅限CurseForge
    {
      value: SortRule.Featured,
      label: SortRuleNames[SortRule.Featured],
      disabled: inModrinth,
    },
    {
      value: SortRule.Name,
      label: SortRuleNames[SortRule.Name],
      disabled: inModrinth,
    },
    {
      value: SortRule.Author,
      label: SortRuleNames[SortRule.Author],
      disabled: inModrinth,
    },
    {
      value: SortRule.Category,
      label: SortRuleNames[SortRule.Category],
      disabled: inModrinth,
    },
    {
      value: SortRule.GameVersion,
      label: SortRuleNames[SortRule.GameVersion],
      disabled: inModrinth,
    },
    {
      value: SortRule.Rating,
      label: SortRuleNames[SortRule.Rating],
      disabled: inModrinth,
    },
    // 仅限Modrinth
    {
      value: SortRule.Relevancy,
      label: SortRuleNames[SortRule.Relevancy],
      disabled: inCurseForge,
    },
  ] satisfies SelectProps<SortRule>["options"];
  // #endregion

  const modCards = useMemo(() => {
    return results.map((mod) => <ModCard key={`${mod.id}`} mod={mod} />);
  }, [results]);

  return (
    <div className="page mods">
      <div className="left">
        <Segmented
          block
          options={sourceOptions}
          value={filterSnap.source}
          onChange={(value) => {
            console.info("切换模组源到：", value);
            filterState.source = value;
          }}
        />
        <Collapse
          className="collapse"
          bordered={false}
          ghost={false}
          size="large"
          expandIconPosition="end"
          defaultActiveKey={["minecraft-versions", "mod-loaders", "categories"]}
        >
          <Collapse.Panel header="Minecraft版本" key="minecraft-versions">
            <Select
              value={filterSnap.gameVersion}
              options={gameVersionOptions}
              onChange={(value) => {
                console.info("Minecraft版本过滤器发生变化：", value);
                filterState.gameVersion = value;
              }}
              placeholder="请选择"
              style={{
                width: "100%",
              }}
              allowClear
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
                filterState.modLoaders = values;
              }}
              value={filterSnap.modLoaders as ModLoader[]}
            />
          </Collapse.Panel>
          <Collapse.Panel header="分类" key="categories">
            <Checkbox.Group
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              onChange={(values) => {
                console.info("分类过滤器发生变化：", values);
                filterState.categoryIds = values;
              }}
              value={filterSnap.categoryIds as CategoryID[]}
            >
              {categoryOptions}
            </Checkbox.Group>
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className="right">
        <Input
          prefix={<SearchOutlined style={{ color: "#BFBFBF" }} />}
          placeholder="关键字"
          value={filterSnap.keyword}
          onChange={(event) => {
            const value = event.currentTarget.value;
            console.info("搜索关键字发生变化：", value);
            filterState.keyword = value;
          }}
        />
        <div className="row">
          <Select
            value={filterSnap.sortRule}
            options={sortRuleOptions}
            style={{ width: 128 }}
            onChange={(value) => {
              console.info("排序规则发生变化：", value);
              filterState.sortRule = value;
            }}
          />
          <div className="remains">
            <Pagination
              current={filterSnap.pageIndex}
              pageSize={filterSnap.pageSize}
              pageSizeOptions={[10, 20, 50]}
              hideOnSinglePage={true}
              total={Math.ceil(total / filterSnap.pageSize)}
              onChange={(page, pageSize) => {
                filterState.pageIndex = page;
                filterState.pageSize = pageSize;
              }}
            />
          </div>
        </div>
        <Flex
          vertical
          className="mod-cards"
          gap={8}
          style={{ marginBottom: 8 }}
        >
          {modCards}
        </Flex>
      </div>
    </div>
  );
};

export default Mods;
