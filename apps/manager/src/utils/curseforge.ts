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
import semver, { SemVer } from "semver";

import type { PagedResponse } from "./commons";

type CategoryID = Category["id"];

const SLUG_PATTERN = /^@([a-z][0-9a-z_\-]*[0-9a-z])$/;
const MINECRAFT_VERSION_REGEX = /^(\d+\.\d+)(\.\d+)?$/;

export interface MinecraftVersionGroup {
  name: string;
  type: number;
  semver: string;
  versions: MinecraftVersion[];
}

export interface MinecraftVersion {
  name: string;
  semver: string;
}

function toSemantic(version: string): string | null {
  const matches = MINECRAFT_VERSION_REGEX.exec(version);
  if (matches === null) {
    console.warn("无效的Minecraft版本：", version);
    return null;
  }

  const [_, major, dotMinor = ".0"] = matches;
  return `${major}${dotMinor}`;
}

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

class CurseForgeAdapter {
  client: Client;

  constructor() {
    const apiKey = localStorage.getItem("CURSE_FORGE_API_KEY") ?? "";
    this.client = new ClientImpl({
      apiKey,
    });
  }

  async getGameVersions(): Promise<MinecraftVersionGroup[]> {
    const vtResp = await this.client.getVersionTypes(GAME_ID_MINECRAFT);
    const groupNames: Record<number, string> = {};
    for (const vt of vtResp.data) {
      if (vt.slug.startsWith("minecraft-1-")) {
        groupNames[vt.id] = vt.name;
      }
    }

    const gvResp = await this.client.getVersions(GAME_ID_MINECRAFT);
    const groups: MinecraftVersionGroup[] = [];
    for (const gv of gvResp.data) {
      const groupName = groupNames[gv.type];
      if (groupName === undefined) {
        console.info("不收录的版本类型：", gv.type);
        continue;
      }

      const groupVersion = groupName.substring("Minecraft ".length);
      const groupSemVer = toSemantic(groupVersion);
      if (groupSemVer === null) {
        console.info("分组版本号不符合规则：", groupVersion);
        continue;
      }

      const versions: MinecraftVersion[] = [];
      console.info(`分组 ${groupName} 的版本：`, gv.versions);
      for (const mcv of gv.versions) {
        const mcsv = toSemantic(mcv);
        if (mcsv === null) {
          continue;
        }
        versions.push({
          name: mcv,
          semver: mcsv,
        });
      }

      versions.sort((v1, v2) => semver.rcompare(v1.semver, v2.semver));

      groups.push({
        type: gv.type,
        name: groupName,
        semver: groupSemVer,
        versions,
      });
    }

    groups.sort((g1, g2) => semver.rcompare(g1.semver, g2.semver));

    console.info("获取Minecraft版本分组如下：", groups);
    return groups;
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

    const index: SearchModsParameters["index"] = (pageIndex - 1) * pageSize;

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
