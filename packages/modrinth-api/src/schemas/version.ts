export interface Version {
  game_versions: string[];
  loaders: string[];
  id: string;
  project_id: string;
  author_id: string;
  featured: boolean;
  name: string;
  version_number: string;
  changelog: string;
  changelog_url: any;
  date_published: string;
  downloads: number;
  version_type: string;
  status: string;
  requested_status: any;
  files: File[];
  dependencies: any[];
}

export interface File {
  hashes: Hashes;
  url: string;
  filename: string;
  primary: boolean;
  size: number;
  file_type: any;
}

export interface Hashes {
  sha512: string;
  sha1: string;
}
