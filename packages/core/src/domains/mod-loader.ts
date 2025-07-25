export enum ModLoader {
  Forge = "forge",
  Fabric = "fabric",
  Quilt = "quilt",
  NeoForge = "neoforge",
}

export const ModLoaderNames: Record<ModLoader, string> = {
  [ModLoader.Forge]: "Forge",
  [ModLoader.Fabric]: "Fabric",
  [ModLoader.Quilt]: "Quilt",
  [ModLoader.NeoForge]: "NeoForge",
};
