export interface VersionManifest {
  latest: Latest;
  versions: Version[];
}

interface Latest {
  release: string;
  snapshot: string;
}

interface Version {
  id: string;
  type: string;
  url: string;
  time: string;
  releaseTime: string;
  sha1: string;
  complianceLevel: number;
}
