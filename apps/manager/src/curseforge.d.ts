// https://www.curseforge.com/api/v1/mods/search?gameId=432&index=0&classId=6&pageSize=20&sortField=2
interface CurseForgeProject {
  id: number;
  author: {
    id: number;
    name: string;
  };
  avatarUrl: string;
  categories: CurseForgeCategory[];
  class: CurseForgeCategory;
  creationDate: number;
  downloads: number;
  gameVersion: string;
  name: string;
  slug: string;
  summary: string;
  updateDate: number;
  releaseDate: number;
}

interface CurseForgeCategory {
  id: number;
  iconUrl: string;
  name: string;
  slug: string;
  url: string;
}

interface CurseForgeResponse<D> {
  data: D;
  pagination?: CurseForgePagination;
}

interface CurseForgePagination {
  index: number;
  pageSize: number;
  totalCount: number;
}
