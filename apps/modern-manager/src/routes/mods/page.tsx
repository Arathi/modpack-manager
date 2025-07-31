import type {Mod} from "@amcs/core";
import {SortRule, SortRuleNames} from "@amcs/core";

import { Checkbox, Collapse, Input, notification, Pagination, Segmented, Select, SelectProps, SwitchProps } from "antd";
import { FiSearch } from "react-icons/fi";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import ModCard from "@/components/mod-card";
import CategoryCheckbox from "@/components/category-checkbox";
import {
  sourceAtom,
  gameVersionAtom,
  modLoadersAtom,
  categoryIdsAtom,
  keywordAtom,
  sortRuleAtom,
  pageIndexAtom,
  pageSizeAtom,
  categoriesAtom,
  gameVersionGroupsAtom,
} from "@/store";

import "./index.less";

const Page = () => {
  const [source, setSource] = useAtom(sourceAtom);
  const [gameVersion, setGameVersion] = useAtom(gameVersionAtom);
  const [modLoaders, setModLoaders] = useAtom(modLoadersAtom);
  const [categoryIds, setCategoryIds] = useAtom(categoryIdsAtom);
  const [keyword, setKeyword] = useAtom(keywordAtom);
  const [sortRule, setSortRule] = useAtom(sortRuleAtom);
  const [pageIndex, setPageIndex] = useAtom(pageIndexAtom);
  const [pageSize, setPageSize] = useAtom(pageSizeAtom);

  const [results, setResults] = useState<Mod[]>([]);
  const [total, setTotal] = useState(0);

  const gameVersionGroups = useAtomValue(gameVersionGroupsAtom);
  const categories = useAtomValue(categoriesAtom);

  const gameVersionOptions = gameVersionGroups.map((group) => ({
    label: group.name,
    title: group.name,
    options: group.versions.map((version) => ({
      label: version.name,
      value: version.name,
    })),
  }));

  const categoryCheckboxes: React.ReactNode[] = categories.map((cat) => (
    <CategoryCheckbox key={cat.id} data={cat} />
  ));

  const sortRuleOptions: SelectProps<SortRule>['options'] = [
    {
      key: "Popularity",
      label: SortRuleNames[SortRule.Popularity],
      value: SortRule.Popularity,
    },
    {
      key: "Downloads",
      label: SortRuleNames[SortRule.Downloads],
      value: SortRule.Downloads,
    },
    {
      key: "Updated",
      label: SortRuleNames[SortRule.Updated],
      value: SortRule.Updated,
    },
  ];

  return (
    <div className="page page-mods">
      <div className="aside">
        <Segmented block options={[{label: "CurseForge", value: "curseforge"}, {label: "Modrinth", value: "modrinth"}]} />
        <Collapse
          bordered={false}
          style={{ backgroundColor: "#ffffff" }}
          defaultActiveKey={["game-version", "mod-loaders", "categories"]}
          items={[{
            key: "game-version",
            label: "Minecraft 版本",
            children: (
              <Select
                style={{ width: "100%" }}
                options={gameVersionOptions}
                value={gameVersion}
                onChange={(value) => setGameVersion(value)}
              />
            ),
          }, {
            key: "mod-loaders",
            label: "模组加载器",
            children: (
              <Checkbox.Group
                options={[{
                  label: "Forge",
                  value: "forge",
                }, {
                  label: "Fabric",
                  value: "fabric",
                }, {
                  label: "Quilt",
                  value: "quilt",
                }, {
                  label: "NeoForge",
                  value: "neoforge",
                }]}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              />
            ),
          }, {
            key: "categories",
            label: "模组分类",
            children: (
              <Checkbox.Group
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {categoryCheckboxes}
              </Checkbox.Group>
            ),
          }]}
        />
      </div>
      <div className="container">
        <Input prefix={<FiSearch style={{ color: "gray" }} />} placeholder="关键字" />
        <div className="row-sort-pagination">
          <Select
            options={sortRuleOptions}
            value={sortRule}
            onChange={(value) => setSortRule(value)}
            style={{ width: 128 }}
          />
          <div className="pagination-container">
            <Pagination
              pageSizeOptions={[10, 20, 50]}
              pageSize={pageSize}
              onChange={(pageIndex, pageSize) => {
                setPageIndex(pageIndex);
                setPageSize(pageSize);
              }} 
            />
          </div>
        </div>
        <div className="results">
          <ModCard
            data={{
              id: 123456,
              slug: "jei",
              name: "Just Enough Items",
              author: "mezz",
              logo: "https://cdn.modrinth.com/data/u6dRKJwZ/4a3f18ac0d096c9f8e9176984c44be4e58f94c89_96.webp",
              description: "View Items and Recipes",
              downloads: 0,
              categories: [
                {
                  id: 423,
                  name: "Map and Information",
                  slug: "map-information",
                  icon: "https://media.forgecdn.net/avatars/6/38/635351497437388438.png"
                },
                {
                  id: 5191,
                  name: "Utility & QoL",
                  slug: "utility-qol",
                  icon: "https://media.forgecdn.net/avatars/456/558/637727379086405233.png",
                },
              ],
              releasedAt: 0,
              updatedAt: 0,
            } satisfies Mod}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
