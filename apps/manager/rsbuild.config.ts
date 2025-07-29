import { defineConfig } from "@rsbuild/core";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

export default defineConfig({
  server: {
    port: 25079,
  },
  html: {
    title: "Arathis Modpack Manager",
  },
  plugins: [pluginReact(), pluginLess(), pluginSvgr()],
});
