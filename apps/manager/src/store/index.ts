import { proxy } from "valtio";

type Store = {
  curseForgeApiKey: string;
};

const store = proxy<Store>({
  curseForgeApiKey: "",
});

export function init() {
  const apiKey = localStorage.getItem("CURSE_FORGE_API_KEY");
  if (apiKey !== null) {
    store.curseForgeApiKey = apiKey;
  }
}

export default store;
