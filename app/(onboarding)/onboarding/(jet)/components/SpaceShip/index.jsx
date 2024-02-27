import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { shipPositionState, enemyPositionState, laserPositionState, scoreState } from './gameState';
import { useGLTF } from '@react-three/drei';

import SpaceShipModel from './SpaceShipModel';
import Lasers from './Lasers';
import Enemies from './Enemies';
import { useEffect } from 'react';
// import './styles.css';

// Game settings.
const ENEMY_SPEED = 0.1;

// Just a placeholder sphere to use with React Suspense while waiting for loaders to resolve.
function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

// Draws two sprites in front of the ship indicating the direction of fire.
// Uses a TextureLoader to load transparent PNG, and sprite to render on a 2d plane facing the camera.
function Target() {
  const rearTarget = useRef();
  const frontTarget = useRef();

  const loader = new TextureLoader();
  // A png with transparency to use as the target sprite.
  const texture = loader.load('target.png');

  // Update the position of the reticle based on the ships current position.
  useFrame(({ mouse }) => {
    rearTarget.current.position.y = -mouse.y * 10;
    rearTarget.current.position.x = -mouse.x * 30;

    frontTarget.current.position.y = -mouse.y * 20;
    frontTarget.current.position.x = -mouse.x * 60;
  });
  // Sprite material has a prop called map to set the texture on.
  return (
    <group>
      <sprite position={[0, 0, -8]} ref={rearTarget}>
        <spriteMaterial attach="material" map={texture} />
      </sprite>
      <sprite position={[0, 0, -16]} ref={frontTarget}>
        <spriteMaterial attach="material" map={texture} />
      </sprite>
    </group>
  );
}

// Calculate the distance between two points in 3d space.
// Used to detect lasers intersecting with enemies.
function distance(p1, p2) {
  const a = p2.x - p1.x;
  const b = p2.y - p1.y;
  const c = p2.z - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
}
// This component runs game logic on each frame draw to update game state.
function GameTimer() {
  const [enemies, setEnemies] = useRecoilState(enemyPositionState);
  const [lasers, setLaserPositions] = useRecoilState(laserPositionState);
  const [score, setScore] = useRecoilState(scoreState);

  const enemiesNum = 3;
  useFrame(({ mouse }) => {
    // Calculate hits and remove lasers and enemies, increase score.
    const hitEnemies = enemies
      ? enemies.map(
          (enemy) =>
            lasers.filter(() => lasers.filter((laser) => distance(laser, enemy) < 3).length > 0)
              .length > 0
        )
      : [];
    if (hitEnemies.includes(true) && enemies.length > 0) {
      //   setScore(score + 1);
      console.log('hit detected');
    }
    // Move all of the enemies. Remove enemies that have been destroyed, or passed the player.
    setEnemies(
      enemies
        .map((enemy) => ({ x: enemy.x, y: enemy.y, z: enemy.z + ENEMY_SPEED }))
        .filter((enemy, idx) => !hitEnemies[idx] && enemy.z < 0)
    );

    // Move the Lasers and remove lasers at end of range or that have hit the ground.
  });

  useEffect(() => {
    if (enemies?.length < enemiesNum) {
      setEnemies([
        ...enemies,
        {
          x: randomNumber(-3, 8),
          y: randomNumber(-4, 7),
          z: randomNumber(-90, -50),
          //   x: randomNumber(-8, 8),
          //   y: randomNumber(-4, 5),
          //   z: randomNumber(-80, -60),
        },
      ]);
    }
  }, [enemies?.length]);

  return null;
}

const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const LightSource = () => {
  return (
    <>
      <directionalLight intensity={1} />
      <ambientLight intensity={0.1} />
    </>
  );
};
const SpaceShip = () => {
  return (
    <group
    // position={[0, 0, -50]}
    >
      <RecoilRoot>
        <LightSource />
        <Suspense fallback={<Loading />}>
          <SpaceShipModel />
          <Lasers />
          <Enemies />
          <GameTimer />
        </Suspense>
        {/* <Target /> */}
      </RecoilRoot>
    </group>
  );
};
export default SpaceShip;
