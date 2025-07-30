import type { SelectProps } from "antd";
import { Select } from "antd";

interface VersionGroup {
  name: string;
  versions: string[];
}

type Props = SelectProps<string> & {
  groups?: VersionGroup[];
};

const GameVersionSelect: React.FC<Props> = ({
  value,
  onChange,
  groups = [],
  ...props
}) => {
  const options = groups.map((group) => ({
    label: group.name,
    title: group.name,
    options: group.versions.map((version) => ({
      label: version,
      value: version,
    })),
  }));

  return (
    <Select
      placeholder="请选择Minecraft版本"
      value={value}
      options={options}
      onChange={onChange}
      allowClear
      {...props}
    />
  );
};

export default GameVersionSelect;
