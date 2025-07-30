import type { Category } from "@amcs/core";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import type { CheckboxProps } from "antd";
import { Checkbox, Flex } from "antd";
import { useMemo, useState } from "react";

type Props = CheckboxProps & {
  data: Readonly<Category>;
};

const CategoryCheckbox: React.FC<Props> = ({ data, ...props }) => {
  const [collapse, setCollapse] = useState(false);
  const toggleIcon = useMemo(() => {
    if (data.children === undefined) {
      return null;
    }
    if (data.children.length === 0) {
      return null;
    }
    if (collapse) {
      return <PlusOutlined onClick={() => setCollapse(false)} />;
    }
    return <MinusOutlined onClick={() => setCollapse(true)} />;
  }, [collapse, data]);

  const subcategoryNodes: React.ReactNode[] = [];
  if (data.children !== undefined) {
    for (const category of data.children) {
      subcategoryNodes.push(<CategoryCheckbox data={category} />);
    }
  }

  let icon: React.ReactNode = null;
  if (data.icon.startsWith("<svg") && data.icon.endsWith("</svg>")) {
    //
  } else if (
    data.icon.startsWith("http://") ||
    data.icon.startsWith("https://")
  ) {
    icon = (
      <img
        src={data.icon}
        alt={`category ${data.id} icon`}
        width={16}
        height={16}
      />
    );
  }

  return (
    <>
      <Flex align="center">
        <Checkbox
          className="category-checkbox"
          value={data.id}
          style={{ flex: 1 }}
          {...props}
        >
          <Flex align="center" gap={8}>
            {icon}
            {data.name}
          </Flex>
        </Checkbox>
        {toggleIcon}
      </Flex>
      <Flex
        vertical
        style={{ display: collapse ? "none" : "flex", marginLeft: 12 }}
      >
        {subcategoryNodes}
      </Flex>
    </>
  );
};

export default CategoryCheckbox;
