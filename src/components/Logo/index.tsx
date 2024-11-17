import { Flex, Image } from 'antd';

const Logo = () => {
  return (
    <>
      <Flex
        vertical
        justify="center"
        align="start"
        style={{
          width: 160,
          height: 64,
          // backgroundColor: 'rgba(0, 255, 0, 0.125)',
          fontWeight: 'bold',
        }}
      >
        <div>Modpack</div>
        <div>Manager</div>
      </Flex>
    </>
  );
};

export default Logo;
