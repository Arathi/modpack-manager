import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

import routes from "./routes";

import "./index.less";

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}
