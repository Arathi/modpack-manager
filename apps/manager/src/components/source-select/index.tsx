import { Source } from "@amcs/core";
import type { SegmentedProps } from "antd";
import { Flex, Segmented } from "antd";

import CurseForgeLogo from "@/assets/curseforge.svg?react";
import ModrinthLogo from "@/assets/modrinth.svg?react";

import "./index.less";

const options = [
  {
    value: Source.CurseForge,
    label: (
      <div className="source-option">
        <CurseForgeLogo width={16} height={16} />
        <span>CurseForge</span>
      </div>
    ),
  },
  {
    value: Source.Modrinth,
    label: (
      <div className="source-option">
        <ModrinthLogo width={16} height={16} />
        <span>Modrinth</span>
      </div>
    ),
  },
];

type Props = Omit<SegmentedProps<Source>, "options">;

export const SourceSelect: React.FC<Props> = ({
  value,
  onChange,
  className,
  style,
  ...props
}) => {
  const classNames = ["source-select", className];
  return (
    <Segmented
      className={classNames.join(" ")}
      options={options}
      value={value}
      block
      style={style}
      onChange={onChange}
      {...props}
    />
  );
};
