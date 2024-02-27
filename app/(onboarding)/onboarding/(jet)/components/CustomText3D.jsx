import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';

const fontName = 'ZenKurenaido-Regular'; // ZenKurenaido-Regular / Teko-SemiBold

const CustomText3D = (props) => {
  const {
    size = 1.25,
    position = [-Math.PI * 2, 0, -20],
    rotation = [0, 0, 0],
    font = `/fonts/${fontName}.json`, // must be json for 3D
    children,
    ...restProps
  } = props;

  const ref = useRef();

  let positionY = position[1];

  // useFrame((state, delta) => {
  //   ref.current.position.y = positionY + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  //   ref.current.position.x = Math.sin(state.clock.elapsedTime) * 0.1;
  //   ref.current.position.z = Math.sin(state.clock.elapsedTime) * 0.1;
  // });

  return (
    <Text3D
      ref={ref}
      font={font}
      characters="abcdefghijklmnopqrstuvwxyz0123456789!"
      // fontSize={size}
      size={size}
      position={position}
      rotation={rotation}
      anchorX="center"
      fog={false}
      {...restProps}
    >
      {children}
    </Text3D>
  );
};

export default CustomText3D;
