import type { ModLoader } from "@amcs/core";

export interface GetVersionsFilter {
  modId: string | number;
  gameVersion?: string;
  modLoader?: ModLoader;
  pageIndex?: number;
  pageSize?: number;
}
