import { Flex } from 'antd';
import NavigatorButton from './NavigatorButton';
import './index.less';
import { FaBinoculars, FaBox, FaHome, FaPuzzlePiece } from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';

const NavigatorBar = () => {
  return (
    <Flex
      className="navigator-bar"
      flex={1}
      gap={16}
      justify="center"
      align="center"
    >
      <NavigatorButton icon={<FaHome />} text="首页" />
      <NavigatorButton icon={<FaPuzzlePiece />} text="模组" />
      <NavigatorButton icon={<FaBox />} text="整合包" />
      <NavigatorButton icon={<FaBinoculars />} text="探索" />
      <NavigatorButton icon={<MdOutlineSettings />} text="设置" />
    </Flex>
  );
};

export default NavigatorBar;
