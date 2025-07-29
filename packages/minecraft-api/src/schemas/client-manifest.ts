export interface ClientManifest {
  arguments: Arguments;
  assetIndex: AssetIndex;
  assets: string;
  complianceLevel: number;
  downloads: Record<string, Download>;
  id: string;
  javaVersion: JavaVersion;
  libraries: Library[];
  logging: Logging;
  mainClass: string;
  minimumLauncherVersion: number;
  releaseTime: string;
  time: string;
  type: string;
}

interface Arguments {
  game: Argument[];
  jvm: Argument[];
}

type Argument = string | ConditionalArgument;

interface ConditionalArgument {
  rules: Rule[];
  value: string | string[];
}

interface Rule {
  action: Action;
  os?: OS;
  features?: Features;
}

type Action = "allow" | "disallow";

interface OS {
  name?: OSName;
  version?: string;
  arch?: OSArch;
}

type OSName = "windows" | "linux" | "osx";
type OSArch = "x86";

interface Features {
  is_demo_user?: boolean;
  has_custom_resolution?: boolean;
  has_quick_plays_support?: boolean;
  is_quick_play_singleplayer?: boolean;
  is_quick_play_multiplayer?: boolean;
  is_quick_play_realms?: boolean;
}

interface AssetIndex {
  id: string;
  sha1: string;
  size: number;
  totalSize: number;
  url: string;
}

interface Download {
  sha1: string;
  size: number;
  url: string;
}

interface JavaVersion {
  component: string;
  majorVersion: number;
}

interface Library {
  downloads: LibraryDownloads;
  name: string;
  rules?: Rule[];
}

interface LibraryDownloads {
  artifact: Artifact;
}

export interface Artifact {
  path: string;
  sha1: string;
  size: number;
  url: string;
}

export interface Logging {
  client: LoggingClient;
}

export interface LoggingClient {
  argument: string;
  file: LoggingConfigFile;
  type: string;
}

export interface LoggingConfigFile {
  id: string;
  sha1: string;
  size: number;
  url: string;
}
