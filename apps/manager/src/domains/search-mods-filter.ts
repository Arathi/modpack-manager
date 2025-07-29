import type { Category, ModLoader, SortRule, Source } from "@amcs/core";

type CategoryID = Category["id"];

export interface SearchModsFilter {
  source: Source;
  sortRule: SortRule;
  pageSize: number;
  pageIndex: number;
  gameVersion?: string;
  modLoaders?: ModLoader[];
  categoryIds?: CategoryID[];
  keyword?: string;
}
