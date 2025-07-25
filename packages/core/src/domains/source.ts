export enum Source {
  CurseForge = "curseforge",
  Modrinth = "modrinth",
}

export const SourceNames: Record<Source, string> = {
  [Source.CurseForge]: "CurseForge",
  [Source.Modrinth]: "Modrinth",
};
