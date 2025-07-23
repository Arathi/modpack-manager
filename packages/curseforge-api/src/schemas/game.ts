/**
 * 已分类游戏版本
 * 
 * /v1/games/{gameId}/versions
 */
export interface GameVersionsByType {
  type: number;
  versions: string[];
}

/**
 * 游戏版本类型
 * 
 * /v1/games/{gameId}/version-types
 */
export interface GameVersionType {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  isSyncable: boolean;
  status: GameVersionTypeStatus;
}

enum GameVersionTypeStatus {
  Normal = 1,
  Deleted = 2,
}

/**
 * 已分类游戏版本（V2）
 * 
 * /v2/games/{gameId}/versions
 */
export interface GameVersionsByTypeV2 {
  type: number;
  versions: GameVersion[];
}

interface GameVersion {
  id: number;
  slug: string;
  name: string;
}
