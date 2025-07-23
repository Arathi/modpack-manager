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

enum ModsSearchSortField {
  Featured = 1,
  Popularity = 2,
  LastUpdated = 3,
  Name = 4,
  Author = 5,
  TotalDownloads = 6,
  Category = 7,
  GameVersion = 8,
  EarlyAccess = 9,
  FeaturedReleased = 10,
  ReleasedDate = 11,
  Rating = 12,
}

type SortOrder = "asc" | "desc";

export enum ModLoaderType {
  Any = 0,
  Forge = 1,
  Cauldron = 2,
  LiteLoader = 3,
  Fabric = 4,
  Quilt = 5,
  NeoForge = 6,
}

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
