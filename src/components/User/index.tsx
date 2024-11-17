import { Flex } from 'antd';
import { FiLogIn } from 'react-icons/fi';
import './index.less';

const User = () => {
  return (
    <Flex className="user" justify="center" align="center" gap={8}>
      <FiLogIn />
      <span>登陆</span>
    </Flex>
  );
};

export default User;
