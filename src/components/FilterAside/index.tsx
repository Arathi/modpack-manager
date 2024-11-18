import { Checkbox, Collapse, type CollapseProps, Flex, Radio } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { useState } from 'react';
import { FaComputer, FaServer } from 'react-icons/fa6';

enum Source {
  CurseForge = 'curseforge',
  Modrinth = 'modrinth',
}

enum ModLoader {
  Forge = 'forge',
  Fabric = 'fabric',
  Quilt = 'quilt',
  NeoForge = 'neoforge',
}

enum Environment {
  Client = 'client',
  Server = 'server',
}

const FilterAside = () => {
  const [source, setSource] = useState<Source>(Source.CurseForge);
  const [loaders, setLoaders] = useState<ModLoader[]>([]);
  const [versions, setVersions] = useState<string[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([]);

  const sourceOptions = [
    {
      label: 'CurseForge',
      value: Source.CurseForge,
    },
    {
      label: 'Modrinth',
      value: Source.Modrinth,
    },
  ];

  const loaderOptions = [
    {
      label: <Flex>Forge</Flex>,
      value: ModLoader.Forge,
    },
    {
      label: <Flex>Fabric</Flex>,
      value: ModLoader.Fabric,
    },
    {
      label: <Flex>Quilt</Flex>,
      value: ModLoader.Quilt,
    },
    {
      label: <Flex>NeoForge</Flex>,
      value: ModLoader.NeoForge,
    },
  ];

  const versionOptions = [
    {
      label: '1.21.1',
      value: '1.21.1',
    },
    {
      label: '1.20.1',
      value: '1.20.1',
    },
    {
      label: '1.19.2',
      value: '1.19.2',
    },
    {
      label: '1.18.2',
      value: '1.18.2',
    },
    {
      label: '1.16.5',
      value: '1.16.5',
    },
    {
      label: '1.12.2',
      value: '1.12.2',
    },
    {
      label: '1.7.10',
      value: '1.7.10',
    },
  ];

  const environmentOptions = [
    {
      label: (
        <Flex align="center" gap={4}>
          <FaComputer />
          <span>客户端</span>
        </Flex>
      ),
      value: Environment.Client,
    },
    {
      label: (
        <Flex align="center" gap={4}>
          <FaServer />
          <span>服务端</span>
        </Flex>
      ),
      value: Environment.Server,
    },
  ];

  const categoryOptions: CheckboxGroupProps['options'] = [];

  const items: CollapseProps['items'] = [
    {
      key: 'sources',
      label: (
        <span style={{ fontWeight: 'bold', fontSize: '1.125em' }}>
          模组来源
        </span>
      ),
      children: (
        <Radio.Group
          options={sourceOptions}
          value={source}
          onChange={e => setSource(e.target.value)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: 24,
            gap: 4,
          }}
        />
      ),
    },
    {
      key: 'loaders',
      label: (
        <span style={{ fontWeight: 'bold', fontSize: '1.125em' }}>加载器</span>
      ),
      children: (
        <Checkbox.Group
          options={loaderOptions}
          value={loaders}
          onChange={values => setLoaders(values)}
          style={{ flexDirection: 'column', paddingLeft: 24, gap: 4 }}
        />
      ),
    },
    {
      key: 'minecraft-versions',
      label: (
        <span style={{ fontWeight: 'bold', fontSize: '1.125em' }}>
          Minecraft 版本
        </span>
      ),
      children: (
        <Checkbox.Group
          options={versionOptions}
          value={versions}
          onChange={values => setVersions(values)}
          style={{ flexDirection: 'column', paddingLeft: 24, gap: 4 }}
        />
      ),
    },
    {
      key: 'envs',
      label: (
        <span style={{ fontWeight: 'bold', fontSize: '1.125em' }}>
          运行环境
        </span>
      ),
      children: (
        <Checkbox.Group
          options={environmentOptions}
          value={environments}
          onChange={values => setEnvironments(values)}
          style={{ flexDirection: 'column', paddingLeft: 24, gap: 4 }}
        />
      ),
    },
    {
      key: 'categories',
      label: (
        <span style={{ fontWeight: 'bold', fontSize: '1.125em' }}>分类</span>
      ),
      children: (
        <Checkbox.Group
          options={categoryOptions}
          style={{ flexDirection: 'column', paddingLeft: 24, gap: 4 }}
        />
      ),
    },
  ];
  return (
    <Flex
      vertical
      style={{
        backgroundColor: '#ffffff',
        width: 256,
        borderRadius: 12,
        padding: 0,
      }}
    >
      <Collapse
        ghost
        items={items}
        defaultActiveKey={[
          'sources',
          'loaders',
          'minecraft-versions',
          'envs',
          'categories',
        ]}
      />
    </Flex>
  );
};

export default FilterAside;
