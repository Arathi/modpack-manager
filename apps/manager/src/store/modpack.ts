import type { ModLoader, Modpack } from "@amcs/core";
import { proxy } from "valtio";

interface State {
  modpacks: Record<string, Modpack>;
  current?: string;
}

const state = proxy<State>({
  modpacks: {},
});

export default state;

const updateGameVersion = (version: string) => {
  //
};

const updateModLoader = (loader: ModLoader) => {
  //
};

const addMod = (slug: string) => {
  //
};

const removeMod = (slug: string) => {
  //
};
