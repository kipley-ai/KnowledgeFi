import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useRecoilState } from 'recoil';
import { enemyPositionState } from './gameState';

// Manages Drawing enemies that currently exist in state
function Enemies() {
  const [enemies, setEnemies] = useRecoilState(enemyPositionState);

  return (
    <group>
      {enemies.map((enemy) => (
        <React.Fragment key={`${enemy.x}`}>
          <Sphere position={[enemy.x, enemy.y, enemy.z]} size={0.5} />
          <Cube position={[enemy.x, enemy.y, enemy.z]} size={3} rotateSpeed={Math.random() + 1} />
        </React.Fragment>
      ))}
    </group>
  );
}

export default Enemies;

const Sphere = (props) => {
  const { position, size = 1 } = props;
  const ref = useRef();
  // useFrame((state, delta) => {
  //   ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta;
  // });

  return (
    <mesh position={position}>
      <sphereGeometry attach="geometry" args={[size, 8, 8]} />
      <meshStandardMaterial attach="material" color="white" fog={false} />
    </mesh>
  );
};

const Cube = (props) => {
  const { position, size = 8, rotateSpeed = 1.5 } = props;
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta * rotateSpeed;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry attach="geometry" args={[size, size, size]} />
      <meshStandardMaterial attach="material" color="white" wireframe fog={false} />
    </mesh>
  );
};
