import { Category, Dependency, Mod, Relation, Version } from "@amcs/core";
import { ModLoader, SortRule } from "@amcs/core";
import type {
  ModFile,
  GetModFilesParameters,
  SearchModsParameters,
} from "@amcs/curseforge-api";
import {
  AbstractClient,
  CLASS_ID_MC_MODS,
  GAME_ID_MINECRAFT,
  ModsSearchSortField,
  ModLoaderType,
  RelationType,
} from "@amcs/curseforge-api";
import axios from "axios";
import { compare as compareVersion } from "semver";

import { GameVersion, GameVersionGroup, GetModVersionsConditions, SearchModsConditions, SearchResults } from "../schemas";
import { BaseAdapter } from "./base-adapter";

const SLUG_REGEX = /^@([0-9a-z_-]+)$/;
const VERSION_REGEX = /^(\d+\.\d+)(\.\d+)?$/;

class Client extends AbstractClient {
  async request<REQ, RES>(method: string, url: string, requestData?: REQ): Promise<RES> {
    const resp = await axios.request<RES>({
      method,
      url,
      data: requestData,
      headers: {
        "x-api-key": this.apiKey,
      }
    });
    return resp.data;
  }
}

export class CurseForgeAdapter extends BaseAdapter {
  client: Client;

  constructor(apiKey: string) {
    super();
    this.client = new Client({
      apiKey,
    });
  }

  async getGameVersionGroups(): Promise<GameVersionGroup[]> {
    const { data: vts } = await this.client.getVersionTypes(GAME_ID_MINECRAFT);
    const { data: gvs } = await this.client.getVersions(GAME_ID_MINECRAFT);

    const groups: GameVersionGroup[] = [];
    for (const vt of vts) {
      if (!vt.slug.startsWith("minecraft-1-")) {
        console.debug("跳过版本分类：", vt.slug);
        continue;
      }

      const gv = gvs.find((it) => it.type === vt.id);
      if (gv === undefined) {
        console.debug("找不到版本分类：", vt.slug);
        continue;
      }

      const version = vt.name.substring("Minecraft ".length);
      const semver = `${version}.0`;

      const versions: GameVersion[] = [];
      for (const name of gv.versions) {
        const matches = VERSION_REGEX.exec(name);
        if (matches === null) {
          console.debug("跳过快照版本：", name);
          continue;
        }

        const [_, major, minor = ".0"] = matches;
        versions.push({
          name,
          semver: `${major}${minor}`,
        });
      }

      versions.sort((v1, v2) => compareVersion(v2.semver, v1.semver));
      groups.push({
        id: vt.id,
        name: vt.name,
        semver,
        versions,
      });
    }

    groups.sort((g1, g2) => compareVersion(g2.semver, g1.semver));
    return groups;
  }

  async getCategoryTree(): Promise<Category[]> {
    const { data } = await this.client.getCategories({
      gameId: GAME_ID_MINECRAFT,
      classId: CLASS_ID_MC_MODS,
    });
    data.sort((c1, c2) => c1.name.localeCompare(c2.name));

    const root: Category[] = [];
    const dict: Record<number, Category> = {};
    for (const it of data) {
      const cat = {
        id: it.id,
        name: it.name,
        slug: it.slug,
        icon: it.iconUrl,
        children: [],
      } satisfies Category;
      dict[it.id] = cat;
      if (it.parentCategoryId === CLASS_ID_MC_MODS) {
        root.push(cat);
      }
    }

    for (const it of data) {
      const cat = dict[it.id];
      if (it.parentCategoryId === undefined) {
        continue;
      }

      const parent = dict[it.parentCategoryId];
      if (parent === undefined) {
        continue;
      }

      if (parent.children === undefined) {
        parent.children = [cat];
      } else {
        parent.children.push(cat);
      }
    }

    return root;
  }

  async searchMods(conditions: SearchModsConditions): Promise<SearchResults<Mod>> {
    const {
      categoryIds = [],
      gameVersion,
      modLoaders = [],
      keyword,
      sortRule,
      pageIndex = 1,
      pageSize = 50,
    } = conditions;

    let searchFilter: string | undefined;
    let slug: string | undefined;
    if (keyword !== undefined && keyword.length > 0) {
      const matches = SLUG_REGEX.exec(keyword);
      if (matches !== null) {
        slug = matches[1];
      } else {
        searchFilter = keyword;
      }
    }

    let sortField: ModsSearchSortField | undefined;
    if (SortRule !== undefined) {
      switch (sortRule) {
        case SortRule.Featured:
          sortField = ModsSearchSortField.Featured;
          break;
        case SortRule.Popularity:
          sortField = ModsSearchSortField.Popularity;
          break;
        case SortRule.Updated:
          sortField = ModsSearchSortField.LastUpdated;
          break;
        case SortRule.Name:
          sortField = ModsSearchSortField.Name;
          break;
        case SortRule.Author:
          sortField = ModsSearchSortField.Author;
          break;
        case SortRule.Downloads:
          sortField = ModsSearchSortField.TotalDownloads;
          break;
        case SortRule.Category:
          sortField = ModsSearchSortField.Category;
          break;
        case SortRule.GameVersion:
          sortField = ModsSearchSortField.GameVersion;
          break;
        case SortRule.Created:
          sortField = ModsSearchSortField.ReleasedDate;
          break;
        case SortRule.Rating:
          sortField = ModsSearchSortField.Rating;
          break;
      }
    }

    const modLoaderTypes: ModLoaderType[] = [];
    for (const modLoader of modLoaders) {
      switch (modLoader) {
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

    let index = (pageIndex - 1) * pageSize;
    if (index < 0) {
      index = 0;
    }

    const params = {
      gameId: GAME_ID_MINECRAFT,
      classId: CLASS_ID_MC_MODS,
      categoryIds,
      gameVersion,
      searchFilter,
      sortField,
      sortOrder: "desc",
      modLoaderTypes,
      slug,
      index,
      pageSize,
    } satisfies SearchModsParameters;

    const { data: list, pagination } = await this.client.searchMods(params);
    const mods: Mod[] = list.map((it) => {
      const releasedAt = 0;
      const updatedAt = 0;
      return {
        id: it.id,
        slug: it.slug,
        name: it.name,
        author: it.authors[0].name,
        logo: it.logo.url,
        description: it.summary,
        downloads: it.downloadCount,
        categories: it.categories.map((cat) => ({
          id: cat.id,
          slug: cat.slug,
          name: cat.name,
          icon: cat.iconUrl,
        })),
        releasedAt,
        updatedAt,
      } satisfies Mod;
    });

    return {
      data: mods,
      page: {
        index: pagination.index,
        size: pagination.pageSize,
        total: pagination.totalCount,
      },
    };
  }
  
  async getModVersions(modId: number, conditions: GetModVersionsConditions): Promise<SearchResults<Version>> {
    const {
      gameVersion,
      modLoader,
      pageIndex = 1,
      pageSize = 50,
    } = conditions;
    
    let modLoaderType: ModLoaderType | undefined;
    switch (modLoader) {
      case ModLoader.Forge:
        modLoaderType = ModLoaderType.Forge;
        break;
      case ModLoader.Fabric:
        modLoaderType = ModLoaderType.Fabric;
        break;
      case ModLoader.Quilt:
        modLoaderType = ModLoaderType.Quilt;
        break;
      case ModLoader.NeoForge:
        modLoaderType = ModLoaderType.NeoForge;
        break;
    }

    let index = (pageIndex - 1) * pageSize;
    if (index < 0) {
      index = 0;
    }
    
    const params = {
      gameVersion,
      modLoaderType,
      index,
      pageSize,
    } satisfies GetModFilesParameters;

    const { data: list, pagination } = await this.client.getModFiles(modId, params);

    const versions = list.map((it) => {
      const hash = it.hashes.find(({algo, value}) => algo === 1);
      const publishedAt = 0;
      const dependencies = it.dependencies.map((dep) => {
        let relation: Relation | undefined;
        switch (dep.relationType) {
          case RelationType.RequiredDependency:
            relation = Relation.Required;
            break;
          case RelationType.OptionalDependency:
            relation = Relation.Optional;
            break;
          default:
            relation = Relation.Other;
            break;
        }
        return {
          id: dep.modId,
          relation,
        } satisfies Dependency;
      });
      const gameVersions: string[] = [];
      const modLoaders: ModLoader[] = [];
      for (const tag of it.gameVersions) {
        switch (tag) {
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

        const matches = VERSION_REGEX.exec(tag);
        if (matches !== null) {
          gameVersions.push(tag);
        }
      }

      return {
        id: it.id,
        modId: it.modId,
        fileName: it.fileName,
        sha1: hash?.value ?? "",
        publishedAt,
        downloads: it.downloadCount,
        fileSize: it.fileSizeOnDisk ?? it.fileLength,
        url: it.downloadUrl,
        gameVersions,
        modLoaders,
        dependencies,
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