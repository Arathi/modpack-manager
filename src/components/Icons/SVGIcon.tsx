import { Image } from 'antd';

interface Props {
  src: string;
  size?: number;
}

const SVGIcon: React.FC<Props> = ({ size = 16, src }) => {
  return <Image src={src} width={size} height={size} />;
};

export default SVGIcon;
