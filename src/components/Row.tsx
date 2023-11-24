import React from "react";

import "./arc.less";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Row({
  className,
  children,
}: Props) {
  let classNames = "arc-row";
  if (className != undefined) {
    classNames += " " + className;
  }

  return <>
    <div className={classNames}>
      { children }
    </div>
  </>;
}