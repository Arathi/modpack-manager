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

export interface Hashes {
    value: string;
    algo: number;
}

export interface SortableGameVersion {
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

export interface Module {
    name: string;
    fingerprint: number;
}