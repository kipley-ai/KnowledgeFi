import React from 'react';
import { useRecoilValue } from 'recoil';
import { laserPositionState } from './gameState';

const Lasers = () => {
  const lasers = useRecoilValue(laserPositionState);
  let bulletSize = 1;

  return (
    <group>
      {lasers.map((laser) => (
        <mesh position={[laser.x, laser.y, laser.z]} key={`${laser.id}`}>
          {/* <boxBufferGeometry attach="geometry" args={[bulletSize, bulletSize, bulletSize]} /> */}
          <sphereBufferGeometry attach="geometry" args={[0.2, 64, 32]} />
          <meshStandardMaterial
            attach="material"
            emissive="white"
            wireframe
            args={[
              {
                fog: false,
              },
            ]}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Lasers;
