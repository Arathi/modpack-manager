import { Flex } from 'antd';
import './index.less';
import { useNavigate } from '@modern-js/runtime/router';

type Props = {
  icon: React.ReactNode;
  text: string;
  to: string;
  className?: string;
};

const NavigatorButton: React.FC<Props> = props => {
  const navigate = useNavigate();

  const { icon, text, to, className = '' } = props;
  const classNames = ['navigator-button', className];

  return (
    <Flex
      className={classNames.join(' ')}
      justify="center"
      align="center"
      gap={8}
      onClick={() => navigate(to)}
    >
      {icon}
      {text}
    </Flex>
  );
};

export default NavigatorButton;
