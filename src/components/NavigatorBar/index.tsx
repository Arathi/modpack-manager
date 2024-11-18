import { Flex } from 'antd';
import NavigatorButton from './NavigatorButton';
import './index.less';
import { useLocation } from '@modern-js/runtime/router';
import { FaBinoculars, FaBox, FaHome, FaPuzzlePiece } from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';

const NavigatorBar = () => {
  const location = useLocation();

  const routes = [
    { icon: <FaHome />, text: '首页', to: '' },
    { icon: <FaPuzzlePiece />, text: '模组', to: '/mods' },
    { icon: <FaBox />, text: '整合包', to: '/modpacks' },
    { icon: <FaBinoculars />, text: '探索', to: '/explore' },
    {
      icon: <MdOutlineSettings />,
      text: '设置',
      to: '/setting',
    },
  ];

  const buttons = routes.map(route => {
    const className = location.pathname === route.to ? 'active' : '';
    return <NavigatorButton key={route.to} className={className} {...route} />;
  });

  return (
    <Flex
      className="navigator-bar"
      flex={1}
      gap={16}
      justify="center"
      align="center"
    >
      {buttons}
    </Flex>
  );
};

export default NavigatorBar;
