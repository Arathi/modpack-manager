import { Category, Mod, Version } from "@amcs/core";
import { GameVersionGroup, GetModVersionsConditions, SearchModsConditions, SearchResults } from "../schemas";

export abstract class BaseAdapter {
  abstract getGameVersionGroups(): Promise<GameVersionGroup[]>;
  abstract getCategoryTree(classId?: number): Promise<Category[]>;
  abstract searchMods(conditions: SearchModsConditions): Promise<SearchResults<Mod>>;
  abstract getModVersions(
    modId: number,
    conditions: GetModVersionsConditions
  ): Promise<SearchResults<Version>>;
}
