import { ModLoader } from "@amcs/core";
import { Checkbox } from "antd";
import type { GetProps } from "antd";

import ForgeOutlined from "@/assets/forge.svg?react";
import FabricOutlined from "@/assets/fabric.svg?react";
import QuiltOutlined from "@/assets/quilt.svg?react";
import NeoForgeOutlined from "@/assets/neoforge.svg?react";

// type CheckboxGroupProps<T> = GetProps<typeof Checkbox.Group<T>>;

export const modLoaderOptions = [
  {
    value: ModLoader.Forge,
    label: (
      <div className="mod-loader">
        <ForgeOutlined width={16} height={16} />
        <span>Forge</span>
      </div>
    ),
  },
  {
    value: ModLoader.Fabric,
    label: (
      <div className="mod-loader">
        <FabricOutlined width={16} height={16} />
        <span>Fabric</span>
      </div>
    ),
  },
  {
    value: ModLoader.Quilt,
    label: (
      <div className="mod-loader">
        <QuiltOutlined width={16} height={16} />
        <span>Quilt</span>
      </div>
    ),
  },
  {
    value: ModLoader.NeoForge,
    label: (
      <div className="mod-loader">
        <NeoForgeOutlined width={16} height={16} />
        <span>NeoForge</span>
      </div>
    ),
  },
];
