import type { Category } from "@amcs/core";
import { proxy } from "valtio";

import type { MinecraftVersionGroup } from "@/utils/curseforge";
import { adapter as curseforge } from "@/utils/curseforge";
import { notification } from "antd";

interface SiteState {
  versionGroups: MinecraftVersionGroup[];
  curseforgeCategories: Category[];
  modrinthCategories: Category[];
}

const state = proxy<SiteState>({
  versionGroups: [],
  curseforgeCategories: [],
  modrinthCategories: [],
});

export function init() {
  curseforge.getGameVersions().then((groups) => {
    console.info("从CurseForge获取版本分组：", groups);
    state.versionGroups = groups;
    notification.info({
      message: "Minecraft版本获取完成",
      placement: "bottomRight",
    });
  });
  curseforge.getCategories().then((categories) => {
    console.info("从CurseForge获取模组分类：", categories);
    state.curseforgeCategories = categories;
    notification.info({
      message: "CurseForge模组分类获取完成",
      placement: "bottomRight",
    });
  });
}

export default state;
