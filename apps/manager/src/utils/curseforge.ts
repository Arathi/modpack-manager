import type {
  Category,
  Mod,
  File,
  Version,
  Source,
  SortRule,
  ModLoader,
} from "@amcs/core";
import {
  Client,
  GAME_ID_MINECRAFT,
  CLASS_ID_MC_MODS,
} from "@amcs/curseforge-api";
import axios, { type AxiosProxyConfig } from "axios";

type CategoryID = Category["id"];

class ClientImpl extends Client {
  async request<REQ, RES>(
    method: string,
    url: string,
    requestData?: REQ,
  ): Promise<RES> {
    let proxy: AxiosProxyConfig | undefined;
    if (this.proxy !== undefined) {
      proxy = {
        host: this.proxy.host,
        port: this.proxy.port,
        protocol: "http",
      };
    }

    const resp = await axios.request<RES>({
      method,
      url,
      data: requestData,
      headers: {
        "x-api-key": this.apiKey,
      },
      proxy,
    });

    return resp.data;
  }
}

interface SearchModsConditions {
  source: Source;
  sortRule: SortRule;
  pageSize: number;
  pageIndex: number;
  gameVersion?: string;
  modLoaders?: ModLoader[];
  categoryIds?: CategoryID[];
  keyword?: string;
  ascend?: boolean;
}

interface GetVersionsConditions {
  source: Source;
}

class CurseForgeAdapter {
  client: Client;

  constructor() {
    const apiKey = localStorage.getItem("CURSE_FORGE_API_KEY") ?? "";
    this.client = new ClientImpl({
      apiKey,
    });
  }

  async getCategories(): Promise<Category[]> {
    const resp = await this.client.getCategories({
      gameId: GAME_ID_MINECRAFT,
      classId: CLASS_ID_MC_MODS,
    });

    type ID = Category["id"];
    const map: Record<ID, Category> = {};

    const categories: Category[] = [];
    for (const c of resp.data) {
      map[c.id] = {
        id: c.id,
        slug: c.slug,
        name: c.name,
        icon: c.iconUrl,
      };
    }

    for (const c of resp.data) {
      const category = map[c.id];

      const parentId = c.parentCategoryId;
      if (parentId === undefined) {
        continue;
      }

      if (parentId === CLASS_ID_MC_MODS) {
        categories.push(category);
        continue;
      }

      const parent = map[parentId];
      if (parent === undefined) {
        continue;
      }

      if (parent.children === undefined) {
        parent.children = [];
      }
      parent.children.push(category);
    }

    return categories;
  }

  async searchMods(conditions: SearchModsConditions): Promise<Mod[]> {
    return [];
  }

  async getVersions(conditions: GetVersionsConditions): Promise<Version[]> {
    return [];
  }
}

export const adapter = new CurseForgeAdapter();
