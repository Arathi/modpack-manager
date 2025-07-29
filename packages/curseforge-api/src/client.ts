import type {
  Category,
  DataResponse,
  File,
  GameVersionsByType,
  GameVersionsByTypeV2,
  GameVersionType,
  GetModFilesParameters,
  ListResponse,
  Mod,
  PaginationResponse,
  SearchModsParameters,
} from "./schemas";

type SearchParams = Record<string, string | number | boolean | undefined>;

const BASE_URL = "https://api.curseforge.com";
const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_INDEX = 0;
const GET = "GET";

export const GAME_ID_MINECRAFT = 432;
export const CLASS_ID_MC_MODS = 6;

export interface Options {
  baseURL?: string;
  apiKey?: string;
  proxy?: Proxy;
}

export interface Proxy {
  host: string;
  port: number;
}

export abstract class Client {
  baseURL: string;
  apiKey?: string;
  proxy?: Proxy;

  constructor({ baseURL = BASE_URL, apiKey, proxy }: Options) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.proxy = proxy;
  }

  async getVersions(
    gameId: number = GAME_ID_MINECRAFT,
  ): Promise<ListResponse<GameVersionsByType>> {
    const path = `/v1/games/${gameId}/versions`;
    return this.get(path);
  }

  async getVersionTypes(
    gameId: number = GAME_ID_MINECRAFT,
  ): Promise<ListResponse<GameVersionType>> {
    const path = `/v1/games/${gameId}/version-types`;
    return this.get(path);
  }

  async getVersionsV2(
    gameId: number = GAME_ID_MINECRAFT,
  ): Promise<ListResponse<GameVersionsByTypeV2>> {
    const path = `/v2/games/${gameId}/versions`;
    return this.get(path);
  }

  async getCategories({
    gameId = GAME_ID_MINECRAFT,
    classId,
    classesOnly,
  }: {
    gameId?: number;
    classId?: number;
    classesOnly?: boolean;
  } = {}): Promise<ListResponse<Category>> {
    const path = `/v1/categories`;
    return this.get(path, {
      gameId,
      classId,
      classesOnly,
    });
  }

  async searchMods({
    gameId = GAME_ID_MINECRAFT,
    classId = CLASS_ID_MC_MODS,
    categoryId,
    categoryIds: categoryIdList = [],
    gameVersion,
    gameVersions: gameVersionList = [],
    searchFilter,
    sortField,
    sortOrder,
    modLoaderType,
    modLoaderTypes: modLoaderTypeList = [],
    gameVersionTypeId,
    authorId,
    primaryAuthorId,
    slug,
    index = DEFAULT_INDEX,
    pageSize = DEFAULT_PAGE_SIZE,
  }: SearchModsParameters = {}): Promise<PaginationResponse<Mod>> {
    const path = "/v1/mods/search";
    const params: SearchParams = {
      gameId,
      classId,
      searchFilter,
      sortField,
      sortOrder,
      gameVersionTypeId,
      authorId,
      primaryAuthorId,
      slug,
      index,
      pageSize,
    };

    // categoryId / categoryIds
    if (categoryIdList !== undefined && categoryIdList.length > 0) {
      params.categoryIds = `[${categoryIdList.join(",")}]`;
    } else if (categoryId !== undefined) {
      params.categoryId = categoryId;
    }

    // gameVersion / gameVersions
    if (gameVersionList !== undefined && gameVersionList.length > 0) {
      params.gameVersions = `[${gameVersionList.join(",")}]`;
    } else if (gameVersion !== undefined) {
      params.gameVersion = gameVersion;
    }

    // modLoaderType / modLoaderTypes
    if (modLoaderTypeList !== undefined && modLoaderTypeList.length > 0) {
      params.modLoaderTypes = `[${modLoaderTypeList.join(",")}]`;
    } else if (modLoaderType !== undefined) {
      params.modLoaderType = modLoaderType;
    }

    return this.get(path, params);
  }

  async getMod(modId: number): Promise<DataResponse<Mod>> {
    const path = `/v1/mods/${modId}`;
    return this.get(path);
  }

  async getModFile(modId: number, fileId: number): Promise<DataResponse<File>> {
    const path = `/v1/mods/${modId}/files/${fileId}`;
    return this.get(path);
  }

  async getModFiles(
    modId: number,
    {
      gameVersion,
      modLoaderType,
      gameVersionTypeId,
      index = DEFAULT_INDEX,
      pageSize = DEFAULT_PAGE_SIZE,
    }: GetModFilesParameters,
  ): Promise<PaginationResponse<File>> {
    const path = `/v1/mods/${modId}/files`;
    const params = {
      gameVersion,
      modLoaderType,
      gameVersionTypeId,
      index,
      pageSize,
    } satisfies SearchParams;
    return this.get(path, params);
  }

  get<RES>(path: string, params?: SearchParams): Promise<RES> {
    const builder = new URL(`${this.baseURL}${path}`);
    if (params !== undefined) {
      for (const key in params) {
        const value = params[key];
        if (value !== undefined) {
          builder.searchParams.set(key, `${value}`);
        }
      }
    }
    const url = builder.toString();
    console.info(`GET ${url}`);
    return this.request(GET, url);
  }

  abstract request<REQ, RES>(
    method: string,
    url: string,
    requestData?: REQ,
  ): Promise<RES>;
}
