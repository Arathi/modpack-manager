import NavigatorBar from '@/components/NavigatorBar';
import { Outlet } from '@modern-js/runtime/router';
import { Flex } from 'antd';
import stylesheet from './index.module.less';

import './index.less';

const RootLayout = () => {
  return (
    <>
      <Flex vertical className={stylesheet['root-layout']}>
        <NavigatorBar />
        <Outlet />
      </Flex>
    </>
  );
};

export default RootLayout;
