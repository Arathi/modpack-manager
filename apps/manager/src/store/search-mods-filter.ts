import { SortRule, Source } from "@amcs/core";
import { proxy, ref } from "valtio";

import type { SearchModsFilter } from "@/domains/search-mods-filter";

const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_PAGE_INDEX = 1;

const defaultValue = {
  source: Source.CurseForge,
  sortRule: SortRule.Popularity,
  pageSize: DEFAULT_PAGE_SIZE,
  pageIndex: DEFAULT_PAGE_INDEX,
  modLoaders: ref([]),
  categoryIds: ref([]),
};

const state = proxy<SearchModsFilter>(defaultValue);

export default state;
