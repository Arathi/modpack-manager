import { Flex } from "antd";
import type { NavLinkProps, To } from "react-router";
import { NavLink } from "react-router";

import "./index.less";

export type LinkProps = {
  key: React.Key;
  to: To;
  icon?: React.ReactNode;
  text?: React.ReactNode;
} & NavLinkProps;

interface Props {
  logo?: React.ReactNode;
  links?: LinkProps[];
  suffix?: React.ReactNode;

  className?: string;
  style?: React.CSSProperties;
}

export const NavigatorBar: React.FC<Props> = ({
  logo,
  links = [],
  suffix,
  className,
  style,
}) => {
  function navLinkClassName(isActive: boolean): string {
    const classNames = ["nav-link"];
    if (isActive) {
      classNames.push("active");
    }
    return classNames.join(" ");
  }

  const linkNodes: React.ReactNode[] = links.map(({ key, to, icon, text }) => (
    <NavLink
      key={key}
      to={to}
      className={({ isActive }) => navLinkClassName(isActive)}
    >
      {icon}
      {text}
    </NavLink>
  ));

  const classNames = ["navigator-bar", className];

  return (
    <nav className={classNames.join(" ")} style={style}>
      {logo}
      <Flex className="links">{linkNodes}</Flex>
      {suffix}
    </nav>
  );
};
