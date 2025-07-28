import type { Category, Mod, File, Version, Source } from "@amcs/core";

import { SortRule, ModLoader } from "@amcs/core";

import {
  Client,
  GAME_ID_MINECRAFT,
  CLASS_ID_MC_MODS,
  ModLoaderType,
  ModsSearchSortField,
  type SearchModsParameters,
} from "@amcs/curseforge-api";
import axios, { type AxiosProxyConfig } from "axios";
import type { PagedResponse } from "./commons";

type CategoryID = Category["id"];

const SLUG_PATTERN = /^@([a-z][0-9a-z_\-]*[0-9a-z])$/;

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

export interface SearchModsConditions {
  source: Source;
  sortRule: SortRule;
  pageSize: number;
  pageIndex: number;
  gameVersion?: string;
  modLoaders?: ModLoader[];
  categoryIds?: CategoryID[];
  keyword?: string;
}

interface GetVersionsConditions {
  source: Source;
}

type SortField = SearchModsParameters['sortField'];

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
    const sorted = resp.data.sort((a, b) => a.name.localeCompare(b.name));
    console.info("从CurseForge获取分类：", sorted);

    type ID = Category["id"];
    const map: Record<ID, Category> = {};

    const categories: Category[] = [];
    for (const c of sorted) {
      map[c.id] = {
        id: c.id,
        slug: c.slug,
        name: c.name,
        icon: c.iconUrl,
      };
    }

    for (const c of sorted) {
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

    console.info("重建分类树：", categories);
    return categories;
  }

  async searchMods(
    conditions: SearchModsConditions,
  ): Promise<PagedResponse<Mod>> {
    const {
      keyword,
      categoryIds: inputCategoryIds = [],
      sortRule,
      modLoaders = [],
      pageIndex = 1,
      pageSize = 50,
    } = conditions;
    let slug: string | undefined;
    if (keyword !== undefined) {
      const matches = SLUG_PATTERN.exec(keyword);
      if (matches !== null) {
        slug = matches[1];
        console.info("根据slug查询：", slug);
      }
    }

    const categoryIds: number[] = [];
    for (const id of inputCategoryIds) {
      if (typeof id === "number") {
        categoryIds.push(id);
      }
    }

    let sortField: ModsSearchSortField;
    switch (sortRule) {
      case SortRule.Relevancy:
        sortField = ModsSearchSortField.Featured;
        break;
      case SortRule.Popularity:
        sortField = ModsSearchSortField.Popularity;
        break;
      case SortRule.Downloads:
        sortField = ModsSearchSortField.TotalDownloads;
        break;
      case SortRule.Created:
        sortField = ModsSearchSortField.ReleasedDate;
        break;
      case SortRule.Updated:
        sortField = ModsSearchSortField.LastUpdated;
        break;
    }

    const modLoaderTypes: ModLoaderType[] = [];
    for (const loader of modLoaders) {
      switch (loader) {
        case ModLoader.Forge:
          modLoaderTypes.push(ModLoaderType.Forge);
          break;
        case ModLoader.Fabric:
          modLoaderTypes.push(ModLoaderType.Fabric);
          break;
        case ModLoader.Quilt:
          modLoaderTypes.push(ModLoaderType.Quilt);
          break;
        case ModLoader.NeoForge:
          modLoaderTypes.push(ModLoaderType.NeoForge);
          break;
      }
    }

    const index: SearchModsParameters['index'] = (pageIndex - 1) * pageSize;

    const params = {
      gameId: GAME_ID_MINECRAFT,
      classId: CLASS_ID_MC_MODS,
      categoryIds,
      gameVersion: conditions.gameVersion,
      searchFilter: conditions.keyword,
      sortField,
      sortOrder: "desc",
      modLoaderTypes,
      slug,
      index,
      pageSize: conditions.pageSize,
    } satisfies SearchModsParameters;

    const resp = await this.client.searchMods(params);
    console.info("搜索结果：", resp);

    const { data: respData, pagination: respPage } = resp;
    const mods: Mod[] = [];
    for (const d of respData) {
      const categories: Category[] = d.categories.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        icon: c.iconUrl,
      }));
      mods.push({
        id: d.id,
        name: d.name,
        slug: d.slug,
        author: d.authors[0].name,
        logo: d.logo.url,
        description: d.summary,
        downloads: d.downloadCount,
        categories,
        releasedAt: 0,
        updatedAt: 0,
      } satisfies Mod);
    }
    return {
      data: mods,
      page: {
        index: Math.floor(respPage.index / respPage.pageSize) + 1,
        size: respPage.pageSize,
        total: respPage.totalCount,
      },
    };
  }

  async getVersions(conditions: GetVersionsConditions): Promise<Version[]> {
    return [];
  }
}

export const adapter = new CurseForgeAdapter();
