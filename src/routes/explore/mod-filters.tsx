import Quilt from '@/components/Icons/Quilt';
import SVGIcon from '@/components/Icons/SvgIcon';
import FabricSrc from '@/icons/fabric.svg';
import ForgeSrc from '@/icons/forge.svg';
import NeoForgeSrc from '@/icons/neo-forge.svg';
import QuiltSrc from '@/icons/quilt.svg';
import {
  Checkbox,
  Collapse,
  type CollapseProps,
  Flex,
  Image,
  Select,
  Space,
} from 'antd';
import stylesheet from './mod-filters.module.less';

const ModFilters = () => {
  const items: CollapseProps['items'] = [
    {
      key: 'mod-loader',
      label: <strong>模组加载器</strong>,
      children: (
        <>
          <Checkbox.Group style={{ flexDirection: 'column' }}>
            <Checkbox value="forge">
              <Space>
                <SVGIcon src={ForgeSrc} />
                <span>Forge</span>
              </Space>
            </Checkbox>
            <Checkbox value="fabric">
              <Space>
                <SVGIcon src={FabricSrc} />
                <span>Fabric</span>
              </Space>
            </Checkbox>
            <Checkbox value="quilt">
              <Space>
                <Quilt />
                <span>Quilt</span>
              </Space>
            </Checkbox>
            <Checkbox value="neo-forge">
              <Space>
                <SVGIcon src={NeoForgeSrc} />
                <span>NeoForge</span>
              </Space>
            </Checkbox>
          </Checkbox.Group>
        </>
      ),
    },
    {
      key: 'game-version',
      label: <strong>游戏版本</strong>,
      children: (
        <>
          <Select placeholder="Minecraft Version" style={{ width: '100%' }}>
            <Select.Option value="1.21">1.21</Select.Option>
            <Select.Option value="1.20.1">1.20.1</Select.Option>
            <Select.Option value="1.18.2">1.18.2</Select.Option>
            <Select.Option value="1.16.5">1.16.5</Select.Option>
          </Select>
        </>
      ),
    },
    {
      key: 'side',
      label: <strong>运行环境</strong>,
      children: (
        <>
          <Checkbox.Group style={{ flexDirection: 'column' }}>
            <Checkbox value="client">客户端</Checkbox>
            <Checkbox value="server">服务端</Checkbox>
          </Checkbox.Group>
        </>
      ),
    },
  ];
  return (
    <Flex vertical className={stylesheet['mod-filter']}>
      <Collapse
        bordered={false}
        items={items}
        style={{ backgroundColor: 'unset' }}
        defaultActiveKey={['mod-loader', 'game-version', 'side']}
      />
    </Flex>
  );
};

export default ModFilters;
