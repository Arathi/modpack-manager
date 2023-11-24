import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';

ReactDOM.createRoot(
  (() => {
    const app = document.createElement('div');
    app.id = "modpack-manager";
    document.body.append(app);
    return app;
  })(),
).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
