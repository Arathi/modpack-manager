import { type To, useLocation, useNavigate } from '@modern-js/runtime/router';
import { Flex } from 'antd';
import { type CSSProperties, useMemo, useState } from 'react';
import UserAvatar from '../UserAvatar';

import stylesheet from './index.module.less';

interface Route {
  key: string;
  text: string;
  to: To;
}

const NavigatorBar = () => {
  const location = useLocation();

  const [routes, setRoutes] = useState<Route[]>([
    { key: 'home', text: '首页', to: '' },
    { key: 'mod', text: '模组', to: 'mod' },
    { key: 'modpack', text: '整合包', to: 'modpack' },
    { key: 'explore', text: '探索', to: 'explore' },
    { key: 'setting', text: '设置', to: 'setting' },
  ]);

  const routerLinks = useMemo(() => {
    const path = location.pathname.substring(1);
    return routes.map(route => {
      let backgroundColor: string | undefined = undefined;
      if (path === route.to) {
        backgroundColor = '#acd9c7';
      }
      return (
        <RouterLink key={route.key} route={route} style={{ backgroundColor }} />
      );
    });
  }, [location, routes]);

  return (
    <Flex align="center" className={stylesheet['navigator-bar']}>
      <Logo />
      <Flex justify="center" flex={1} gap={8}>
        {routerLinks}
      </Flex>
      <UserAvatar />
    </Flex>
  );
};

const Logo = () => {
  return (
    <Flex className={stylesheet['app-logo']} justify="center" align="center">
      Modpack Manager
    </Flex>
  );
};

const RouterLink: React.FC<{
  route: Route;
  style?: CSSProperties;
}> = ({ route, style }) => {
  const navigate = useNavigate();
  const { text, to } = route;
  return (
    <>
      <Flex
        className={stylesheet['router-link']}
        onClick={() => navigate(to)}
        style={style}
      >
        {text}
      </Flex>
    </>
  );
};

export default NavigatorBar;
