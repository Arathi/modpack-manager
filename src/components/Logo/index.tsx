import { Flex, Image } from 'antd';

const Logo = () => {
  return (
    <>
      <Flex align="center" gap={8}>
        <div
          style={{
            width: 48,
            height: 48,
            backgroundColor: '#999999',
            borderRadius: 8,
          }}
        />
        <Flex
          vertical
          justify="center"
          align="center"
          style={{
            height: 64,
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          <div>Modpack</div>
          <div>Manager</div>
        </Flex>
      </Flex>
    </>
  );
};

export default Logo;
