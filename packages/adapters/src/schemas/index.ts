import { ModLoader, SortRule } from "@amcs/core";

export interface GameVersionGroup {
  id: number;
  name: string;
  semver: string;
  versions: GameVersion[];
}

export interface GameVersion {
  name: string;
  semver: string;
}

export interface SearchModsConditions {
  gameVersion?: string;
  modLoaders?: ModLoader[];
  categoryIds?: number[];
  keyword?: string;
  sortRule?: SortRule;
  pageIndex?: number;
  pageSize?: number;
}

export interface GetModVersionsConditions {
  gameVersion?: string;
  modLoader?: ModLoader;
  pageIndex?: number;
  pageSize?: number;
}

export interface SearchResults<D> {
  data: Array<D>;
  page: Page;
}

export interface Page {
  index: number;
  size: number;
  total: number;
}
