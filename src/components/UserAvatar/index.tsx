import { Avatar, Button, Flex, List, Popover } from 'antd';

const UserAvatar = () => {
  const title = (
    <Flex align="center" gap={8}>
      <Avatar>?</Avatar>
      <Flex vertical>
        <span>Username</span>
        <span style={{ color: 'gray' }}>E-mail</span>
      </Flex>
    </Flex>
  );

  const content = (
    <Flex vertical>
      <Button type="text" style={{ justifyContent: 'start' }}>
        个人资料
      </Button>
      <Button type="text" style={{ justifyContent: 'start' }}>
        设置
      </Button>
      <Button type="text" danger style={{ justifyContent: 'start' }}>
        退出
      </Button>
    </Flex>
  );

  return (
    <Popover
      trigger="click"
      placement="bottomRight"
      title={title}
      content={content}
    >
      <Avatar>?</Avatar>
    </Popover>
  );
};

export default UserAvatar;
