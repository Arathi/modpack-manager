import type { ID } from "../types";
import type { ModLoader } from "./mod-loader";

export interface Version {
  id: ID;
  modId: ID;
  fileName: string;
  sha1: string;
  publishedAt: number;
  downloads: number;
  fileSize: number;
  url: string;
  gameVersions: string[];
  modLoaders: ModLoader[];
  dependencies: Dependency[];
}

export interface Dependency {
  id: ID;
  version?: ID;
  relation?: Relation;
}

export enum Relation {
  Required,
  Optional,
  Other,
}
