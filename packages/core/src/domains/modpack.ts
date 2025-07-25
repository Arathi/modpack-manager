import type { ModLoader } from "./mod-loader";

export interface Modpack {
  /**
   * 模组整合包ID
   * 
   * 格式：[a-z][0-9]
   */
  id: string;

  /**
   * 名称
   */
  name: string;

  /**
   * 版本号
   */
  version: string;

  /**
   * Minecraft版本
   */
  gameVersion: string;

  /**
   * 模组加载器
   */
  modLoader: ModLoader;

  /**
   * 模组加载器版本
   */
  modLoaderVersion?: string;

  /**
   * 必要模组
   */
  required?: Record<string, ModFileLocator>;

  /**
   * 可选模组
   */
  optional?: Record<string, ModFileLocator>;

  /**
   * 依赖模组
   */
  dependencies?: Record<string, ModFileLocator>;
}

type ModFileLocator = string | ModFileTraits;

interface ModFileTraits {
  source?: Source;
  slug?: string;
  id?: string;
  version?: string;
  hash?: string;
}

type Source = "curseforge" | "modrinth" | "file"; 
