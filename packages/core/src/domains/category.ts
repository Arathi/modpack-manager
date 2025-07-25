import type { ID } from "../types";

export interface Category {
  id: ID;
  slug: string;
  name: string;
  icon: string;
  children?: Category[];
}
