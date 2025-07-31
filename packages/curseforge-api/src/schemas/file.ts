export interface File {
  id: number;
  gameId: number;
  modId: number;
  isAvailable: boolean;
  displayName: string;
  fileName: string;
  releaseType: number;
  fileStatus: number;
  hashes: Hashes[];
  fileDate: string;
  fileLength: number;
  downloadCount: number;
  fileSizeOnDisk: number;
  downloadUrl: string;
  gameVersions: string[];
  sortableGameVersions: SortableGameVersion[];
  dependencies: Dependency[];
  alternateFileId: number;
  isServerPack: boolean;
  fileFingerprint: number;
  modules: Module[];
}

interface Hashes {
  value: string;
  algo: HashAlgo;
}

export enum HashAlgo {
  SHA1 = 1,
  MD5 = 2,
};

interface SortableGameVersion {
  gameVersionName: string;
  gameVersionPadded: string;
  gameVersion: string;
  gameVersionReleaseDate: string;
  gameVersionTypeId: number;
}

export interface Dependency {
  modId: number;
  relationType: number;
}

export enum RelationType {
  EmbeddedLibrary = 1,
  OptionalDependency = 2,
  RequiredDependency = 3,
  Tool = 4,
  Incompatible = 5,
  Include = 6,
}

interface Module {
  name: string;
  fingerprint: number;
}
