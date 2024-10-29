import type Mod from '@/domains/mod';
import { Flex, type FlexProps, Image } from 'antd';
import stylesheet from './index.module.less';

type Props = Omit<FlexProps, 'children'> & {
  mod: Mod;
};

const ModCard: React.FC<Props> = props => {
  const { mod } = props;
  const { slug, author, name, summary, avatarUrl } = mod;
  const authorHref = `https://www.curseforge.com/members/${author.name}`;
  const modHref = `/mod/${slug}`;

  return (
    <Flex className={stylesheet['mod-card']} {...props} gap={8}>
      <Flex>
        <Image src={avatarUrl} width={100} height={100} />
      </Flex>
      <Flex vertical>
        <Flex className={stylesheet['mod-names']} align="end" gap={4}>
          <a href={authorHref} className={stylesheet['author-name']}>
            {author.name}
          </a>
          <span>/</span>
          <a href={modHref} className={stylesheet['mod-name']}>
            {name}
          </a>
        </Flex>
        <Flex flex={1} className={stylesheet['mod-summary']}>
          {summary}
        </Flex>
        <Flex>
          <div />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ModCard;
