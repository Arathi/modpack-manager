import Logo from '@/components/Logo';
import NavigatorBar from '@/components/NavigatorBar';
import User from '@/components/User';
import { Outlet } from '@modern-js/runtime/router';
import { ConfigProvider } from 'antd';
import './index.less';

export default function Layout() {
  return (
    <ConfigProvider>
      <div className="root-layout">
        <div className="root-header">
          <Logo />
          <NavigatorBar />
          <User />
        </div>
        <div className="root-content">
          <Outlet />
        </div>
      </div>
    </ConfigProvider>
  );
}
