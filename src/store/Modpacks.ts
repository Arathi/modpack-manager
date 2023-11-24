import { atom, selector } from "recoil";
import {GM} from '$';
import Modpack from '../domains/Modpack';

const modpackIdState = atom<string|undefined>({
  key: "modpackIdState",
  default: GM.getValue<string|undefined>("modpackId", undefined),
});

const modpacksState = atom<Modpack[]>({
  key: "modpacksState",
  default: GM.getValue<Modpack[]>("modpacks", []),
});

export const modpackIdSelector = selector<string|undefined>({
  key: "modpackIdSelector",
  get: ({get}) => get(modpackIdState),
  set: ({set}, newValue) => {
    console.debug(`当前modpack切换为${newValue}`);
    set(modpackIdState, newValue)
    GM.setValue("modpackId", newValue);
  }
});

export const currentModpackSelector = selector<Modpack|undefined>({
  key: "currentModpackState",
  get: ({get}) => {
    const id = get(modpackIdState);
    if (id == undefined) return undefined;

    const modpacks = get(modpacksState);
    return modpacks.find((mp) => mp.id == id);
  },
});

export const modpacksSelector = selector<Modpack[]>({
  key: "modpacksSelector",
  get: ({get}) => get(modpacksState),
  set: ({set}, newValue) => {
    console.debug("更新整合包列表", newValue);
    set(modpacksState, newValue);
    GM.setValue("modpacks", newValue);
  },
});
