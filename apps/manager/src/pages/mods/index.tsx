import type { Category, Mod } from "@amcs/core";
import {
  ModLoader,
  Source,
  SortRule,
  SortRuleNames,
  SourceNames,
} from "@amcs/core";
import {
  Button,
  Checkbox,
  Collapse,
  Flex,
  Input,
  Pagination,
  Segmented,
  Select,
  type GetProps,
  type SelectProps,
  type SegmentedProps,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im";

import {
  adapter as curseforge,
  type SearchModsConditions,
} from "@/utils/curseforge";
import type { PagedResponse } from "@/utils/commons";
import { ModCard } from "./mod-card";

import CurseForgeLogo from "@/assets/curseforge.svg?react";
import ModrinthLogo from "@/assets/modrinth.svg?react";
import ForgeOutlined from "@/assets/forge.svg?react";
import FabricOutlined from "@/assets/fabric.svg?react";
import QuiltOutlined from "@/assets/quilt.svg?react";
import NeoForgeOutlined from "@/assets/neoforge.svg?react";

import "./index.less";

type CheckboxGroupProps<T> = GetProps<typeof Checkbox.Group<T>>;
type CategoryID = Category["id"];

const CategoryCheckbox: React.FC<{
  category: Category;
  className?: string;
  style?: GetProps<typeof Checkbox>["style"];
}> = ({ category, className, style }) => {
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
    <Checkbox className={classNames.join(" ")} style={style}>
      <Flex align="center" gap={8}>
        {icon}
        <span>{category.name}</span>
      </Flex>
    </Checkbox>
  );
};

const Mods = () => {
  const [source, setSource] = useState<Source>(Source.CurseForge);
  const [gameVersion, setGameVersion] = useState<string>();
  const [modLoaders, setModLoaders] = useState<ModLoader[]>([]);
  const [categoryIds, setCategoryIds] = useState<CategoryID[]>([]);

  const [keyword, setKeyword] = useState("");
  const [sortRule, setSortRule] = useState<SortRule>(SortRule.Relevancy);
  const [pageSize, setPageSize] = useState(50);
  const [pageIndex, setPageIndex] = useState(1);

  const [categories, setCategories] = useState<Category[]>([]);
  const [results, setResults] = useState<Mod[]>([]);
  const [total, setTotal] = useState(0);

  const sortRuleOptions: SelectProps<SortRule>["options"] = [
    {
      value: SortRule.Relevancy,
      label: SortRuleNames[SortRule.Relevancy],
    },
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
  ];

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

  const [gameVersions, setGameVersions] = useState<string[]>([
    "1.21.8",
    "1.21.6",
    "1.21.5",
    "1.21.1",
  ]);

  const gameVersionOptions: SelectProps["options"] = gameVersions.map((v) => ({
    value: v,
    label: `Minecraft ${v}`,
  }));

  const modLoaderOptions: CheckboxGroupProps<ModLoader>["options"] = [
    {
      value: ModLoader.Forge,
      label: (
        <div className="mod-loader">
          <ForgeOutlined width={16} height={16} />
          <span>Forge</span>
        </div>
      ),
    },
    {
      value: ModLoader.Fabric,
      label: (
        <div className="mod-loader">
          <FabricOutlined width={16} height={16} />
          <span>Fabric</span>
        </div>
      ),
    },
    {
      value: ModLoader.Quilt,
      label: (
        <div className="mod-loader">
          <QuiltOutlined width={16} height={16} />
          <span>Quilt</span>
        </div>
      ),
    },
    {
      value: ModLoader.NeoForge,
      label: (
        <div className="mod-loader">
          <NeoForgeOutlined width={16} height={16} />
          <span>NeoForge</span>
        </div>
      ),
    },
  ];

  const categoryOptions = useMemo(() => {
    const options: React.ReactNode[] = [];
    categories.forEach((c) => {
      options.push(
        <CategoryCheckbox key={c.id} category={c} />,
      );
      const children = c.children ?? [];
      children.forEach((cc) => {
        options.push(
          <CategoryCheckbox
            key={cc.id}
            category={cc}
            style={{ marginLeft: 12 }}
          />,
        );
      });
    });
    return options;
  }, [categories]);

  const modCards = useMemo(() => {
    return results.map((mod) => <ModCard key={`${mod.id}`} mod={mod} />);
  }, [results]);

  useEffect(() => {
    console.info("模组源切换到：", SourceNames[source]);
    if (source === Source.CurseForge) {
      curseforge.getCategories().then((cats) => {
        console.info("从CurseForge获取到分类：", cats);
        setCategories(cats);
        setCategoryIds([]);
      });
    } else if (source === Source.Modrinth) {
      // modrinth.getCategories()
      setCategories([]);
      setCategoryIds([]);
    }
  }, [source]);

  useEffect(() => {
    console.info("搜索条件发生变化：", {
      source,
      gameVersion,
      modLoaders,
      categoryIds,
      keyword,
      sortRule,
      pageSize,
      pageIndex,
    });
    const conditions = {
      source,
      sortRule,
      pageSize,
      pageIndex,
      gameVersion,
      modLoaders,
      categoryIds,
      keyword,
    } satisfies SearchModsConditions;
    curseforge.searchMods(conditions).then((resp) => {
      const { data: mods, page } = resp;
      setResults(mods);
      setTotal(page.total);
    });
  }, [
    source,
    gameVersion,
    modLoaders,
    categoryIds,
    keyword,
    sortRule,
    pageSize,
    pageIndex,
  ]);

  return (
    <div className="page mods">
      <div className="left">
        <Segmented
          block
          options={sourceOptions}
          onChange={(value) => setSource(value)}
        />
        <Collapse
          className="collapse"
          bordered={false}
          defaultActiveKey={["minecraft-versions", "mod-loaders", "categories"]}
        >
          <Collapse.Panel header="Minecraft版本" key="minecraft-versions">
            <Select
              value={gameVersion}
              options={gameVersionOptions}
              onChange={(version) => {
                console.info("Minecraft版本过滤器发生变化：", version);
                setGameVersion(version);
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
                setModLoaders(values);
              }}
              value={modLoaders}
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
                setCategoryIds(values);
              }}
              value={categoryIds}
            >
              {categoryOptions}
            </Checkbox.Group>
          </Collapse.Panel>
        </Collapse>
      </div>
      <div className="right">
        <Input
          placeholder="关键字"
          value={keyword}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setKeyword(value);
          }}
        />
        <div className="row">
          <Select
            value={sortRule}
            options={sortRuleOptions}
            style={{ width: 128 }}
            onChange={(value) => setSortRule(value)}
          />
          <div className="remains">
            <Pagination
              current={pageIndex}
              pageSize={pageSize}
              pageSizeOptions={[10, 20, 50]}
              hideOnSinglePage={true}
              total={Math.ceil(total / pageSize)}
            />
          </div>
        </div>
        {modCards}
      </div>
    </div>
  );
};

export default Mods;
