import { ModLoader } from "./ModLoader";

export default interface Modpack {
  id: string;
  name: string;
  version: string;
  gameVersion: string;
  loader: ModLoader;
}