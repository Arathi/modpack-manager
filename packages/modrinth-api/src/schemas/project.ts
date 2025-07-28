export interface Project {
  client_side: string;
  server_side: string;
  game_versions: string[];
  id: string;
  slug: string;
  project_type: string;
  team: string;
  organization: any;
  title: string;
  description: string;
  body: string;
  body_url: any;
  published: string;
  updated: string;
  approved: string;
  queued: any;
  status: string;
  requested_status: string;
  moderator_message: any;
  license: License;
  downloads: number;
  followers: number;
  categories: string[];
  additional_categories: any[];
  loaders: string[];
  versions: string[];
  icon_url: string;
  issues_url: string;
  source_url: string;
  wiki_url: string;
  discord_url: string;
  donation_urls: Donation[];
  gallery: Gallery[];
  color: number;
  thread_id: string;
  monetization_status: string;
}

interface License {
  id: string;
  name: string;
  url: any;
}

interface Donation {
  id: string;
  platform: string;
  url: string;
}

interface Gallery {
  url: string;
  raw_url: string;
  featured: boolean;
  title: string;
  description: string | null;
  created: string;
  ordering: number;
}
