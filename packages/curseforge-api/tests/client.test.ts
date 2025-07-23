import { test, expect } from "vitest";

import { ClientAxios as Client } from "./client-axios";
import { ModLoaderType } from "../src/schemas";

const JEI_ID = 238222;
const JEI_SLUG = "jei";
const JEI_NAME = "Just Enough Items (JEI)";
const JEI_SUMMARY = "View Items and Recipes";
const JEI_LATEST_ID = 6767951;

const client = new Client({
  proxy: {
    host: "127.0.0.1",
    port: 8118,
    protocol: "http",
  }
});

test("获取版本", async () => {
  const { data: versions } = await client.getVersions();
  console.info("versions = ", versions);

  const { data: versionTypes } = await client.getVersionTypes();
  console.info("version types = ", versionTypes);
});

test("获取版本（V2）", async () => {
  const { data: versions } = await client.getVersionsV2();
  console.info("versions = ", versions);
});

test("获取分类", async () => {
  const { data: categories } = await client.getCategories();
  console.info("categories = ", categories);
  expect(categories.length).greaterThan(0);

  const mods = categories.find((c) => c.id === 6);
  console.info("mc-mods = ", mods);
  expect(mods).not.toBeUndefined();
  if (mods === undefined) {
    return;
  }

  expect(mods.slug).toBe('mc-mods');
  expect(mods.name).toBe("Mods");
});

test("搜索模组", async () => {
  const { data: mods } = await client.searchMods({
    slug: JEI_SLUG,
  });
  console.info("mods = ", mods);
  expect(mods.length).greaterThan(0);

  const jei = mods.find((mod) => mod.slug === JEI_SLUG);
  console.info("jei = ", jei);
  expect(jei).not.toBeUndefined();
  if (jei === undefined) {
    return;
  }

  expect(jei.id).toBe(JEI_ID);
  expect(jei.name).toBe(JEI_NAME);
  expect(jei.summary).toBe(JEI_SUMMARY);
});

test("获取模组", async () => {
  const { data: jei } = await client.getMod(JEI_ID);
  console.info("jei = ", jei);
  
  expect(jei.id).toBe(JEI_ID);
  expect(jei.name).toBe(JEI_NAME);
  expect(jei.summary).toBe(JEI_SUMMARY);
});

test("获取模组文件", async () => {
  const { data: file } = await client.getModFile(JEI_ID, JEI_LATEST_ID);
  console.info("jei = ", file);
});

test("获取模组文件列表", async () => {
  const { data: files } = await client.getModFiles(JEI_ID, {
    gameVersion: "1.20.6",
    modLoaderType: ModLoaderType.Fabric,
  });
  console.info("files = ", files);
  expect(files.length).greaterThanOrEqual(7);
});
