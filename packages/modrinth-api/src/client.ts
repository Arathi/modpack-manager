type SearchProjectsParameters = {
  query?: string;
  facets?: Facet[];
  index?: Index;
  offset?: number;
  limit?: number;
};

type Facet = "";

enum Index {
  Relevance = "relevance",
  Downloads = "downloads",
  Followers = "follows",
  DatePuhlished = "newest",
  DateUpdated = "updated",
}

interface SearchResultResponse<D = object> {
  hits: Array<D>;
  offset: number;
  limit: number;
  total_hits: number;
}

enum ProjectType {
  Mod = "mod",
  Modpack = "modpack",
  ResourcePack = "resourcepack",
  Shader = "shader",
  Plugin = "plugin",
  DataPack = "datapack",
}

interface ProjectSearchResult {
  project_id: string;
  project_type: ProjectType;
  slug: string;
  author: string;
  title: string;
  description: string;
  categories: string[];
  display_categories: string[];
  versions: string[];
  downloads: number;
  follows: number;
  icon_url: string;
  date_created: string;
  date_modified: string;
  latest_version: string;
  license: string;
  client_side: string;
  server_side: string;
  gallery: string[];
  featured_gallery: string | null;
  color: number;
}

interface Project {
  client_side: string;
  server_side: string;
  game_versions: string[];
  id: string;
  slug: string;
  project_type: ProjectType;
  team: string;
  organization: string | null;
  title: string;
  description: string;
  body: string;
  body_url: string | null;
  published: string;
  updated: string;
  approved: string;
  queued: any;
  status: ProjectStatus;
  requested_status: RequestedStatus;
  moderator_message: any;
  license: License;
  downloads: number;
  followers: number;
  categories: string[];
  additional_categories: string[];
  loaders: ModLoader[];
  versions: string[];
  icon_url: string;
  issues_url: string;
  source_url: string;
  wiki_url: string;
  discord_url: string;
  donation_urls: Donation[];
  gallery: Image[];
  color: number;
  thread_id: string;
  monetization_status: MonetizationStatus;
}

type ProjectStatus = string;

type RequestedStatus = string;

interface License {
  id: string;
  name: string;
  url: string | null;
}

enum ModLoader {
  Forge = "forge",
  Fabric = "fabric",
  Quilt = "quilt",
  NeoForge = "neoforge",
}

interface Donation {
  id: string;
  platform: string;
  url: string;
}

interface Image {
  url: string;
  raw_url: string;
  featured: boolean;
  title: string;
  description: string | null;
  created: string;
  ordering: number;
}

type MonetizationStatus = string;

enum RequireType {
  Required = "required",
  Unsupported = "unsupported",
}

export abstract class Client {
  baseURL: string = "https://api.modrinth.com/v2";

  async searchProjects(
    params: SearchProjectsParameters,
  ): Promise<SearchResultResponse<ProjectSearchResult>> {
    const path = "/search";
    return {
      hits: [],
      offset: 0,
      limit: 0,
      total_hits: 0,
    };
  }

  async getProject(id: string) {
    const path = `/project/${id}`;
  }

  async listVersions(
    id: string,
    loaders?: ModLoader[],
    gameVersions?: string[],
    featured?: boolean,
  ) {
    const path = `/project/${id}/version`;
  }

  async getVersion(id: string) {
    const path = `/version/${id}`;
  }

  async get(path: string) {
    const url = `${this.baseURL}`;
  }

  abstract request<RES>(url: string): Promise<RES>;
}
