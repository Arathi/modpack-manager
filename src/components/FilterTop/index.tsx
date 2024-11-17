import { Button, Flex, Input, Select } from 'antd';
import { FaSearch } from 'react-icons/fa';

const FilterTop = () => {
  return (
    <Flex
      gap={8}
      align="center"
      style={{ padding: 12, backgroundColor: '#ffffff', borderRadius: 12 }}
    >
      <Input placeholder="关键字" prefix={<FaSearch color="gray" />} />
      <Flex justify="end" style={{ width: 72 }}>
        排序
      </Flex>
      <Select placeholder="排序字段" />
      <Flex justify="end" style={{ width: 128 }}>
        每页数量
      </Flex>
      <Select placeholder="每页数量" />
      <Button variant="solid" color="primary" icon={<FaSearch />}>
        搜索
      </Button>
    </Flex>
  );
};

export default FilterTop;
