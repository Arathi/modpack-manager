import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
  html: {
    title: "Arathis Modpack Manager"
  },
  plugins: [pluginReact(), pluginLess(), pluginSvgr()],
});
