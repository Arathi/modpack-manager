import { CurseForgeAdapter } from "@amcs/adapters";
import type { GameVersionGroup } from "@amcs/adapters/dist/schemas";
import type { Category } from "@amcs/core";
import { ModLoader, SortRule, Source } from "@amcs/core";
import { atom, useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

type CategoryID = number | string;

export const sourceAtom = atom<Source>(Source.CurseForge);
export const gameVersionAtom = atom<string>("");
export const modLoadersAtom = atom<ModLoader[]>([]);
export const categoryIdsAtom = atom<CategoryID[]>([]);
export const keywordAtom = atom<string>("");
export const sortRuleAtom = atom<SortRule>(SortRule.Popularity);
export const pageIndexAtom = atom<number>(1);
export const pageSizeAtom = atom<number>(50);

export const gameVersionGroupsAtom = atom<GameVersionGroup[]>([]);

export const curseforgeCategoriesAtom = atom<Category[]>([]);
export const modrinthCategoriesAtom = atom<Category[]>([]);
export const categoriesAtom = atom((get) => {
  if (get(sourceAtom) === Source.CurseForge) {
    return get(curseforgeCategoriesAtom);
  }
  return get(modrinthCategoriesAtom);
});

export const curseforgeApiKeyAtom = atomWithStorage<string>("curseforgeApiKey", "", {
  getItem(key, initialValue) {
    const value = localStorage.getItem(key);
    if (value === null) {
      localStorage.set(key, initialValue);
      return initialValue;
    }
    return value;
  },
  setItem(key, newValue) {
    localStorage.setItem(key, newValue);
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
});

export const curseforgeAtom = atom((get) => {
  const apiKey: string = get(curseforgeApiKeyAtom);
  console.info("重新创建CurseForge客户端适配器：", apiKey);
  return new CurseForgeAdapter(apiKey);
});
