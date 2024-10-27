import ModCard from '@/components/ModCard';
import { Helmet } from '@modern-js/runtime/head';
import { useLoaderData } from '@modern-js/runtime/router';
import { Button, Flex, Input } from 'antd';
import { FaSearch } from 'react-icons/fa';
import ModFilters from './mod-filters';
import type { LoaderData } from './page.data';

import stylesheet from './index.module.less';

const Page = () => {
  const loaderData = useLoaderData() as LoaderData;

  const results: React.ReactNode[] = loaderData.mods.map(mod => {
    return <ModCard key={mod.id} mod={mod} />;
  });

  return (
    <>
      <Helmet>
        <title>探索</title>
      </Helmet>
      <Flex className={stylesheet['explore-page']} gap={8}>
        <ModFilters />
        <Flex vertical flex={1} gap={8}>
          <Flex
            className={stylesheet['search-bar']}
            gap={8}
            style={{ padding: 12, backgroundColor: 'white', borderRadius: 12 }}
          >
            <Input placeholder="关键字" />
            <Button variant="solid" color="primary" icon={<FaSearch />}>
              搜索
            </Button>
          </Flex>
          <Flex vertical gap={8}>
            {results}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Page;
