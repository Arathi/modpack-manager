import type Mod from '@/domains/mod';

export type LoaderData = {
  mods: Mod[];
  pagination?: Pagination;
};

interface SearchParameters {
  pageIndex?: number;
  gameVersion?: string;
  pageSize?: number;
  sortField?: number;
  categoryIds?: string[];
  gameFlavors?: string[];
}

interface SearchResponse {
  data: Mod[];
  pagination: Pagination;
}

interface Pagination {
  index: number;
  pageSize: number;
  totalCount: number;
}

async function search(params: SearchParameters): Promise<SearchResponse> {
  const {
    pageIndex = 0,
    gameVersion = '',
    pageSize = 50,
    sortField = 1,
    categoryIds = [],
    gameFlavors = [],
  } = params;
  const url = new URL('https://www.curseforge.com/api/v1/mods/search');
  url.searchParams.set('gameId', '432');
  url.searchParams.set('index', `${pageIndex}`);
  url.searchParams.set('classId', '6');
  // url.searchParams.set('gameVersion', `${gameVersion}`);
  url.searchParams.set('pageSize', `${pageSize}`);
  url.searchParams.set('sortField', `${sortField}`);
  // url.searchParams.set('categoryIds', `${categoryIds.join(',')}`);
  // url.searchParams.set('gameFlavors', `${gameFlavors.join(',')}`);

  console.info('发送GET请求：', url);
  const resp = await fetch(url, {
    method: 'GET',
  });
  const searchResp: SearchResponse = await resp.json();

  return searchResp;
}

export async function loader(): Promise<LoaderData> {
  const resp = await search({});
  console.info('响应报文如下：', resp);
  const { data: mods, pagination } = resp;
  return {
    mods,
    pagination,
  };
}
