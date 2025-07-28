import type { ID } from "../types";
import type { Category } from "./category";

export interface Mod {
  id: ID;
  slug: string;
  name: string;
  author: string;
  logo: string;
  description: string;
  downloads: number;
  categories: Category[];
  releasedAt: number;
  updatedAt: number;
}
