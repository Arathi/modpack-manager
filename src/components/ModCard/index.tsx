import type Mod from '@/domains/mod';
import { Flex, type FlexProps, Image } from 'antd';
import stylesheet from './index.module.less';

type Props = Omit<FlexProps, 'children'> & {
  mod: Mod;
};

const ModCard: React.FC<Props> = props => {
  const { mod } = props;
  const { author, name, summary, avatarUrl } = mod;
  return (
    <Flex className={stylesheet['mod-card']} {...props} gap={8}>
      <Flex>
        <Image src={avatarUrl} width={100} height={100} />
      </Flex>
      <Flex vertical>
        <Flex gap={8}>
          <strong>{author.name}</strong>
          <strong>/</strong>
          <strong>{name}</strong>
        </Flex>
        <Flex>{summary}</Flex>
      </Flex>
    </Flex>
  );
};

export default ModCard;
