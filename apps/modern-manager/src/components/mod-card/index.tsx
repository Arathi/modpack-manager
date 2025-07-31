
import type { Mod } from "@amcs/core";
import { Button } from "antd";
import type { HTMLAttributes } from "react";
import { useState } from "react";

import "./index.less";

type Props = HTMLAttributes<HTMLDivElement> & {
  data: Mod;
};

const ModCard: React.FC<Props> = ({ data, className, style, ...props }) => {
  const [hover, setHover] = useState(false);

  const classNames = ["mod-card", className];

  const logo = (
    <img
      src={data.logo}
      alt={`mod icon #${data.id} @${data.slug}`}
      width={108}
      height={108}
    />
  );
  
  const categoryIcons: React.ReactNode[] = data.categories.map((cat) => {
    return (
      <img
        key={cat.id}
        src={cat.icon}
        alt={`category icon ${cat.id}`}
        title={cat.name}
        width={24}
        height={24}
      />
    );
  });

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    <div
      className={classNames.join(" ")}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      <div className="logo">
        { logo }
      </div>
      <div className="container">
        <div className="names">
          <span>{data.author}</span>
          <span>/</span>
          <span>{data.name}</span>
        </div>
        <div className="description">
          {data.description}
        </div>
        <div className="footer">
          <div className="categories">
            {categoryIcons}
          </div>
          <div className="id-slug">
            <span>#{data.id}</span>
            <span>/</span>
            <span>@{data.slug}</span>
          </div>
        </div>
      </div>
      <div className="overlay" style={{
        display: !hover ? "none" : undefined,
      }}>
        <div className="buttons">
          <Button className="button-download">下载</Button>
          <Button className="button-add">添加</Button>
        </div>
      </div>
    </div>
  );
}

export default ModCard;
