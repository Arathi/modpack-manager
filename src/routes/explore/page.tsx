import FilterAside from '@/components/FilterAside';
import FilterTop from '@/components/FilterTop';
import Results from '@/components/Results';
import { Helmet } from '@modern-js/runtime/head';
import { Flex } from 'antd';

const Page = () => {
  return (
    <>
      <Helmet>
        <title>探索</title>
      </Helmet>
      <Flex gap={12}>
        <FilterAside />
        <Flex vertical flex={1} gap={12}>
          <FilterTop />
          <Results />
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
