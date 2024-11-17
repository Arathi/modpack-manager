import { Flex } from 'antd';
import './index.less';

type Props = {
  icon: React.ReactNode;
  text: string;
};

const NavigatorButton: React.FC<Props> = props => {
  const { icon, text } = props;
  return (
    <Flex className="navigator-button" gap={8} justify="center" align="center">
      {icon}
      {text}
    </Flex>
  );
};

export default NavigatorButton;
