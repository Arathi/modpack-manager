import type { Category } from "@amcs/core";
import type { CheckboxProps } from "antd";
import { Checkbox } from "antd";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

type Props = CheckboxProps & {
  data: Category;
  level?: number;
};

const CategoryCheckbox: React.FC<Props> = ({ data, level = 0, ...props }) => {
  const [collapse, setCollapse] = useState(true);

  const offset = 12 * level;
  let children: React.ReactNode[] = [];

  let icon: React.ReactNode = null;
  if (data.icon.startsWith("https://") || data.icon.startsWith("http://")) {
    icon = (
      <img
        src={data.icon}
        width={16}
        height={16}
        alt={`category icon ${data.slug}`}
        style={{ marginRight: 8 }}
      />
    );
  }

  let toggleButton: React.ReactNode = null;
  if (data.children !== undefined && data.children.length > 0) {
    toggleButton = collapse ? 
      <FaPlus onClick={() => setCollapse(!collapse)} /> : 
      <FaMinus onClick={() => setCollapse(!collapse)} />;
    
    if (!collapse) {
      children =  data.children.map((subcat) => <CategoryCheckbox key={subcat.id} data={subcat} level={level+1} />);
    }
  }

  return (
    <>
      <div className="category-checkbox-container" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Checkbox value={data.id} style={{ paddingLeft: offset, flex: 1 }} {...props}>
          { icon }
          { data.name }
        </Checkbox>
        { toggleButton }
      </div>
      { children }
    </>
  );
};

export default CategoryCheckbox;
