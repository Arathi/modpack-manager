import type { ModLoaderType } from "./mod-loader-type";
import type { ModsSearchSortField } from "./sort-field";

/**
 * /v1/mods/search
 */
export interface SearchModsParameters {
  gameId?: number;
  classId?: number;
  categoryId?: number;
  categoryIds?: number[];
  gameVersion?: string;
  gameVersions?: string[];
  searchFilter?: string;
  sortField?: ModsSearchSortField;
  sortOrder?: SortOrder;
  modLoaderType?: ModLoaderType;
  modLoaderTypes?: ModLoaderType[];
  gameVersionTypeId?: number;
  authorId?: number;
  primaryAuthorId?: number;
  slug?: string;
  index?: number;
  pageSize?: number;
}

type SortOrder = "asc" | "desc";

/**
 * /v1/mods/{modId}/files
 */
export interface GetModFilesParameters {
  gameVersion?: string;
  modLoaderType?: ModLoaderType;
  gameVersionTypeId?: number;
  index?: number;
  pageSize?: number;
}
