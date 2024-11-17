import {
  Checkbox,
  Collapse,
  type CollapseProps,
  Divider,
  Flex,
  Radio,
} from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import { FaComputer, FaServer } from 'react-icons/fa6';

const FilterAside = () => {
  const sourceOptions = [
    {
      label: 'CurseForge',
      value: 'curseforge',
    },
    {
      label: 'Modrinth',
      value: 'modrinth',
    },
  ];

  const loaderOptions = [
    {
      label: 'Forge',
      value: 'forge',
    },
    {
      label: 'Fabric',
      value: 'fabric',
    },
    {
      label: 'Quilt',
      value: 'quilt',
    },
    {
      label: 'NeoForge',
      value: 'neoforge',
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

  const envOptions = [
    {
      label: (
        <Flex align="center" gap={4}>
          <FaComputer />
          <span>客户端</span>
        </Flex>
      ),
      value: 'client',
    },
    {
      label: (
        <Flex align="center" gap={4}>
          <FaServer />
          <span>服务端</span>
        </Flex>
      ),
      value: 'server',
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
          style={{ flexDirection: 'column', paddingLeft: 24, gap: 4 }}
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
          options={envOptions}
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
