import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const fontName = 'Helvetica-65-Medium'; // ZenKurenaido-Regular / Teko-SemiBold / Jura-Regular / Helvetica-65-Medium

const CustomText2D = (props) => {
  const {
    size = 1.25,
    position = [0, 2.25, 0],
    rotation = [0, -Math.PI / 2, 0],
    font = `/fonts/${fontName}.woff`,
    children,
    ...restProps
  } = props;

  const ref = useRef();
  let positionY = position[1];

  useFrame((state, delta) => {
    ref.current.position.y = positionY + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    ref.current.position.x = Math.sin(state.clock.elapsedTime) * 0.1;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <Text
      ref={ref}
      font={font}
      characters="abcdefghijklmnopqrstuvwxyz0123456789!"
      fontSize={size}
      position={position}
      rotation={rotation}
      anchorX="center"
      {...restProps}
      material-fog={false}
    >
      {children}
    </Text>
  );
};

export default CustomText2D;
