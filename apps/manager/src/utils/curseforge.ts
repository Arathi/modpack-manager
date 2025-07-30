import type { Category, Mod, Version, Source } from "@amcs/core";
import { SortRule, ModLoader } from "@amcs/core";
import type {
  SearchModsParameters,
  GetModFilesParameters,
} from "@amcs/curseforge-api";
import {
  Client,
  GAME_ID_MINECRAFT,
  CLASS_ID_MC_MODS,
  ModLoaderType,
  ModsSearchSortField,
} from "@amcs/curseforge-api";
import axios, { type AxiosProxyConfig } from "axios";
import semver from "semver";
import dayjs from "dayjs";

import type { SearchModsFilter } from "@/domains/search-mods-filter";
import type { PagedResponse } from "./commons";
import type { GetVersionsFilter } from "@/domains/get-versions-filter";

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

const modLoaderDict: Partial<Record<ModLoaderType, ModLoader>> = {
  [ModLoaderType.Forge]: ModLoader.Forge,
  [ModLoaderType.Fabric]: ModLoader.Fabric,
  [ModLoaderType.Quilt]: ModLoader.Quilt,
  [ModLoaderType.NeoForge]: ModLoader.NeoForge,
};

const modLoaderTypes: Record<ModLoader, ModLoaderType> = {
  [ModLoader.Forge]: ModLoaderType.Forge,
  [ModLoader.Fabric]: ModLoaderType.Fabric,
  [ModLoader.Quilt]: ModLoaderType.Quilt,
  [ModLoader.NeoForge]: ModLoaderType.NeoForge,
};

// const relations: Record<number, Relation> = {
//   2: Relation.Required,
//   3: Relation.Optional,
//   4: Relation.Other,
// };

function toSemantic(version: string): string | null {
  const matches = MINECRAFT_VERSION_REGEX.exec(version);
  if (matches === null) {
    // console.warn("无效的Minecraft版本：", version);
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
        // console.info("不收录的版本类型：", gv.type);
        continue;
      }

      const groupVersion = groupName.substring("Minecraft ".length);
      const groupSemVer = toSemantic(groupVersion);
      if (groupSemVer === null) {
        // console.info("分组版本号不符合规则：", groupVersion);
        continue;
      }

      const versions: MinecraftVersion[] = [];
      // console.info(`分组 ${groupName} 的版本：`, gv.versions);
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

    // console.info("获取Minecraft版本分组如下：", groups);
    return groups;
  }

  async getCategories(): Promise<Category[]> {
    const resp = await this.client.getCategories({
      gameId: GAME_ID_MINECRAFT,
      classId: CLASS_ID_MC_MODS,
    });
    const sorted = resp.data.sort((a, b) => a.name.localeCompare(b.name));
    // console.info("从CurseForge获取分类：", sorted);

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

    // console.info("重建分类树：", categories);
    return categories;
  }

  async searchMods(
    filter: Readonly<SearchModsFilter>,
  ): Promise<PagedResponse<Mod>> {
    const {
      keyword,
      categoryIds: inputCategoryIds = [],
      sortRule,
      modLoaders = [],
      pageIndex = 1,
      pageSize = 50,
    } = filter;
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

    let sortField: ModsSearchSortField | undefined;
    switch (sortRule) {
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
      case SortRule.Featured:
        sortField = ModsSearchSortField.Featured;
        break;
      case SortRule.Name:
        sortField = ModsSearchSortField.Name;
        break;
      case SortRule.Author:
        sortField = ModsSearchSortField.Author;
        break;
      case SortRule.Category:
        sortField = ModsSearchSortField.Category;
        break;
      case SortRule.GameVersion:
        sortField = ModsSearchSortField.GameVersion;
        break;
      case SortRule.Rating:
        sortField = ModsSearchSortField.Rating;
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
      gameVersion: filter.gameVersion,
      searchFilter: filter.keyword,
      sortField,
      sortOrder: "desc",
      modLoaderTypes,
      slug,
      index,
      pageSize: filter.pageSize,
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

  async getVersions(
    filter: GetVersionsFilter,
  ): Promise<PagedResponse<Version>> {
    const { modId, gameVersion, pageIndex = 1, pageSize = 50 } = filter;
    let modLoaderType: ModLoaderType | undefined;
    if (filter.modLoader !== undefined) {
      modLoaderType = modLoaderTypes[filter.modLoader];
    }

    const params = {
      gameVersion,
      modLoaderType: modLoaderType,
      index: (pageIndex - 1) * pageSize,
      pageSize,
    } satisfies GetModFilesParameters;

    const { data, pagination } = await this.client.getModFiles(
      modId as number,
      params,
    );

    const versions = data.map((f) => {
      const hash = f.hashes.find((h) => h.algo === 1);
      const sha1 = hash?.value ?? "";
      const publishedDay = dayjs();

      const gameVersions: string[] = [];
      const modLoaders: ModLoader[] = [];
      for (const cfgv of f.gameVersions) {
        switch (cfgv) {
          case "Forge":
            modLoaders.push(ModLoader.Forge);
            break;
          case "Fabric":
            modLoaders.push(ModLoader.Fabric);
            break;
          case "Quilt":
            modLoaders.push(ModLoader.Quilt);
            break;
          case "NeoForge":
            modLoaders.push(ModLoader.NeoForge);
            break;
        }
      }

      // const dependencies: Version["dependencies"] = f.dependencies.map((dep) => {
      //   let relation = [];
      //   switch () {
      //     case
      //   }
      //   return {
      //     id: dep.modId,
      //     relation,
      //   };
      // });

      return {
        id: f.id,
        modId: f.modId,
        fileName: f.fileName,
        sha1,
        publishedAt: publishedDay.unix(),
        downloads: f.downloadCount,
        fileSize: f.fileSizeOnDisk,
        url: f.downloadUrl,
        gameVersions,
        modLoaders,
        dependencies: [],
      } satisfies Version;
    });

    return {
      data: versions,
      page: {
        index: pagination.index,
        size: pagination.pageSize,
        total: pagination.totalCount,
      },
    };
  }
}

export const adapter = new CurseForgeAdapter();
