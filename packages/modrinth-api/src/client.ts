import type { ProjectSearchResult } from "./schemas/search-results";
import type { SearchProjectsParameters } from "./schemas/parameters/search-projects";
import { ModLoader } from "./schemas/mod-loader";

export abstract class Client {
  baseURL: string = "https://api.modrinth.com/v2";

  async searchProjects(
    params: SearchProjectsParameters,
  ): Promise<ProjectSearchResult> {
    const path = "/search";
    return this.get(path);
  }

  async getProject(id: string) {
    const path = `/project/${id}`;
    return this.get(path);
  }

  async listVersions(
    id: string,
    loaders?: ModLoader[],
    gameVersions?: string[],
    featured?: boolean,
  ) {
    const path = `/project/${id}/version`;
    return this.get(path);
  }

  async getVersion(id: string) {
    const path = `/version/${id}`;
    return this.get(path);
  }

  async get<RES>(path: string): Promise<RES> {
    const url = new URL(`${this.baseURL}${path}`);
    return this.request(url.toString());
  }

  abstract request<RES>(url: string): Promise<RES>;
}
