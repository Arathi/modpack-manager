import {
  Button,
  Checkbox,
  Collapse,
  Input,
  Pagination,
  Segmented,
  Select,
  type GetProps,
  type SelectProps,
  type SegmentedProps,
  Flex,
} from "antd";
import { useEffect, useMemo, useState, type HTMLAttributes } from "react";
import type { Category } from "@amcs/core";
import {
  Source,
  ModLoader,
  SortRule,
  SortRuleNames,
  SourceNames,
} from "@amcs/core";
import { ImSortAmountAsc, ImSortAmountDesc } from "react-icons/im";

import { adapter as curseforge } from "@/utils/curseforge";

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
  style?: GetProps<typeof Checkbox>['style'];
}> = ({ category, className, style }) => {
  const classNames = ["category-checkbox", className];
  let icon: React.ReactNode;
  if (category.icon.startsWith("<svg") && category.icon.endsWith("</svg>")) {
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    icon = <div dangerouslySetInnerHTML={{ __html: category.icon }} />
  } else if (category.icon.startsWith("https://") && category.icon.endsWith(".png")) {
    icon = <img src={category.icon} alt={category.name} />;
  }

  return (
    <Checkbox className={classNames.join(" ")} style={style}>
      <Flex align="center" gap={8}>
        { icon }
        <span>{ category.name }</span>
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
  const [ascend, setAscend] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [pageIndex, setPageIndex] = useState(1);

  const [categories, setCategories] = useState<Category[]>([]);

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

  const sortOrderIcon = useMemo(
    () => (ascend ? <ImSortAmountAsc /> : <ImSortAmountDesc />),
    [ascend],
  );

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

  const gameVersionOptions: SelectProps["options"] = gameVersions.map(
    (v) => ({
      value: v,
      label: `Minecraft ${v}`,
    }),
  );

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
        <Checkbox value={c.id}>
          <Flex align="center" gap={8}>
            <img src={c.icon} width={16} height={16} alt={`category ${c.id} icon`} />
            <span style={{ userSelect: "none" }}>{c.name}</span>
          </Flex>
        </Checkbox>
      );
      const children = c.children ?? [];
      children.forEach((cc) => {
        options.push(
          <Checkbox value={cc.id} style={{ marginLeft: 24 }}>
            <Flex align="center" gap={8}>
              <img src={cc.icon} width={16} height={16} alt={`category ${c.id} icon`} />
              <span style={{ userSelect: "none" }}>{cc.name}</span>
            </Flex>
          </Checkbox>,
        );
      });
    });
    return options;
  }, [categories]);

  useEffect(() => {
    console.info("模组源切换到：", SourceNames[source]);
    if (source === Source.CurseForge) {
      curseforge.getCategories().then((cats) => {
        console.info("从CurseForge获取到分类：", cats);
        setCategories(cats);
      });
    } else if (source === Source.Modrinth) {
      // modrinth.getCategories()
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
      ascend,
      pageSize,
      pageIndex,
    });
  }, [
    source,
    gameVersion,
    modLoaders,
    categoryIds,
    keyword,
    sortRule,
    ascend,
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
          <Button icon={sortOrderIcon} onClick={() => setAscend(!ascend)} />
          <div className="remains">
            <span>每页数量：</span>
            <Select
              options={[
                {
                  value: 10,
                  label: "10",
                },
                {
                  value: 20,
                  label: "20",
                },
                {
                  value: 50,
                  label: "50",
                },
              ]}
              value={pageSize}
              onChange={(value) => setPageSize(value)}
            />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mods;
