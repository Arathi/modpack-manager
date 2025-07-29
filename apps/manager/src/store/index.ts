import { SortRule, Source } from "@amcs/core";
import { proxy, ref } from "valtio";

import type { SearchModsConditions } from "@/utils/curseforge";

type Store = {
  curseForgeApiKey: string;
  searchModsFilter: SearchModsConditions;
};

const store = proxy<Store>({
  curseForgeApiKey: "",
  searchModsFilter: ref({
    source: Source.CurseForge,
    sortRule: SortRule.Downloads,
    pageSize: 50,
    pageIndex: 1,
  }),
});

export function init() {
  const apiKey = localStorage.getItem("CURSE_FORGE_API_KEY");
  if (apiKey !== null) {
    store.curseForgeApiKey = apiKey;
  }
}

export default store;
