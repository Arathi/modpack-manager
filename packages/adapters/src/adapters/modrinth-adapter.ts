import { Category, Mod, Version } from "@amcs/core";
// import { Client as AbstractClient } from "@amcs/modrinth-api";
import { GameVersionGroup, GetModVersionsConditions, SearchModsConditions, SearchResults } from "../schemas";

import { BaseAdapter } from "./base-adapter";

// class Client extends AbstractClient {
//   //
// }

export class ModrinthAdapter extends BaseAdapter {
  // client: Client
  
  constructor() {
    super();
  }

  async getGameVersionGroups(): Promise<GameVersionGroup[]> {
    return [];
  }

  async getCategoryTree(): Promise<Category[]> {
    // TODO
    return [];
  }

  async searchMods(conditions: SearchModsConditions): Promise<SearchResults<Mod>> {
    // TODO
    return {
      data: [],
      page: {
        index: 0,
        size: 0,
        total: 0,
      },
    };
  }

  async getModVersions(modId: number, conditions: GetModVersionsConditions): Promise<SearchResults<Version>> {
    // TODO
    return {
      data: [],
      page: {
        index: 0,
        size: 0,
        total: 0,
      },
    }
  }
}
