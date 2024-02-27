import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { useRecoilState } from 'recoil';
import { laserPositionState } from './gameState';
import { useControls } from 'leva';
import { controllerObj_spaceship_model } from '../../Constants';

const LASER_RANGE = 100;
const LASER_Z_VELOCITY = 0.5;
const GROUND_HEIGHT = -50;
const SHIP_POS_Z = -13; // -15

// The players ship model. On each frame, check the cursor position and move the ship to point in the
// correct direction. Save ship position in state in order to drive other components like target reticle, and
// laser velocity.

let model1 = 'arwing.glb';
let model2 = 'lockheed_sr-71_blackbird.glb';
let model4 = 'blackbird-sf-edited-1-plane.glb';

const SpaceShipModel = (props) => {
  const [lasers, setLasers] = useRecoilState(laserPositionState);
  let controlsData_spaceShipModel = useControls('SpaceShip Model', controllerObj_spaceship_model);
  // model 2
  // controlsData_spaceShipModel['rotation'] = [-Math.PI / 2, -Math.PI / 2, 0];
  controlsData_spaceShipModel['rotation'] = [Math.PI / 2, Math.PI / 2, 0];

  const ship = useRef();
  let angle = 5;

  useFrame((state) => {
    const { mouse } = state;
    // console.log('ship.current', ship.current);
    let position = { x: mouse.x * 6 * angle, y: mouse.y * 2 * angle };
    let rotation = { z: -mouse.x * 0.5, x: -mouse.x * 0.5, y: -mouse.y * 0.2 };
    ship.current.rotation.x = rotation.y;
    ship.current.rotation.y = rotation.x;
    ship.current.rotation.z = rotation.z;
    ship.current.position.x = position.x;
    ship.current.position.y = position.y < -4 ? -4 : position.y;

    // animate laser movement
    setLasers(
      lasers
        .map((laser) => ({
          id: laser.id,
          x: laser.x + laser.velocity[0],
          y: laser.y + laser.velocity[1],
          // z: laser.z - LASER_Z_VELOCITY,
          z: laser.z - laser.velocity[2],
          velocity: laser.velocity,
        }))
        .filter((laser) => laser.z > -LASER_RANGE && laser.y > GROUND_HEIGHT)
    );
    // setLasers(
    //   lasers
    //     .map((laser) => ({
    //       id: laser.id,
    //       x: laser.x + laser.velocity[0] * -1,
    //       y: laser.y + laser.velocity[1] * -1,
    //       // z: laser.z - LASER_Z_VELOCITY,
    //       z: laser.z - laser.velocity[2],
    //       velocity: laser.velocity,
    //     }))
    //     .filter((laser) => laser.z > -LASER_RANGE && laser.y > GROUND_HEIGHT)
    // );
  });

  const handleOnShoot = () => {
    if (ship?.current) {
      setLasers([
        ...lasers,
        {
          id: Math.random(), // This needs to be unique.. Random isn't perfect but it works. Could use a uuid here.
          x: ship?.current.position.x,
          y: ship?.current.position.y,
          z: ship?.current.position.z - 2,
          // x: 0,
          // y: 0,
          // z: 0,
          velocity: [ship?.current.rotation.x * Math.PI, ship?.current.rotation.y, Math.PI * 2],
        },
      ]);
    }
  };

  // model 1
  // const objModel1 = useLoader(GLTFLoader, `/models/${model1}`);
  // let objGeometry = objModel1.nodes.Default.geometry;

  // model 2
  // const objModel2 = useLoader(GLTFLoader, `/models/${model2}`);
  // const { nodes } = objModel2;
  // let meshes = null;
  // if (nodes) {
  //   meshes = [];
  //   // for (let i = 2; i < 34; i++) {
  //   for (let i = 2; i < 34; i++) {
  //     if (i == 18 || i == 30 || i == 31 || i == 32) {
  //       continue;
  //     }
  //     let anObjGeometry = nodes?.[`Object_${i}`].geometry;

  //     meshes.push(
  //       <mesh
  //         key={i}
  //         visible
  //         castShadow
  //         receiveShadow
  //         geometry={anObjGeometry}
  //         // material={materials.DefaultWhite}
  //         scale={controlsData_spaceShipModel.scale}
  //         // rotation={controlsData_spaceShipModel.rotation}
  //         rotation={
  //           new THREE.Euler(
  //             controlsData_spaceShipModel.rotation?.[0],
  //             controlsData_spaceShipModel.rotation?.[1],
  //             controlsData_spaceShipModel.rotation?.[2],
  //             'ZYX'
  //           )
  //         }
  //       >
  //         <meshStandardMaterial
  //           attach="material"
  //           color="white"
  //           roughness={1}
  //           metalness={0}
  //           fog={false}
  //         />
  //       </mesh>
  //     );
  //   }
  // }

  const objModel4 = useLoader(GLTFLoader, `/models/${model4}`);
  const { nodes: model4Nodes } = objModel4;
  // console.log('objModel4', objModel4);
  let model4Meshes = null;
  if (model4Nodes) {
    model4Meshes = [];
    for (let i = 1; i < 12; i++) {
      let anObjGeometry = model4Nodes?.[`imagetostl_mesh_${i}`].geometry;

      model4Meshes.push(
        <mesh
          key={i}
          visible
          castShadow
          receiveShadow
          geometry={anObjGeometry}
          // material={materials.DefaultWhite}
          scale={controlsData_spaceShipModel.scale}
          // rotation={controlsData_spaceShipModel.rotation}
          rotation={
            new THREE.Euler(
              controlsData_spaceShipModel.rotation?.[0],
              controlsData_spaceShipModel.rotation?.[1],
              controlsData_spaceShipModel.rotation?.[2],
              'ZYX'
            )
          }
        >
          <meshStandardMaterial
            attach="material"
            color="#009fff"   // old: #03ad14
            roughness={1}
            metalness={0}
            fog={false}
          />
        </mesh>
      );
    }
  }

  return (
    <>
      <group ref={ship} position={[0, 0, SHIP_POS_Z]} onPointerUp={() => null} dispose={null}>
        {/* {meshes} */}
        {/* {model3Meshes} */}
        {model4Meshes}
        {/* <mesh
          visible
          castShadow
          receiveShadow
          geometry={objGeometry}
          // material={materials.DefaultWhite}
          scale={controlsData_spaceShipModel.scale}
        >
          <meshStandardMaterial
            attach="material"
            color="white"
            roughness={1}
            metalness={0}
            fog={false}
          />
        </mesh> */}
      </group>
      <mesh position={[0, 0, SHIP_POS_Z - 2]} onClick={handleOnShoot}>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial
          attach="material"
          color="orange"
          emissive="#ff0860"
          visible={false}
          fog={false}
        />
      </mesh>
    </>
  );

  // model 2
  return (
    <>
      <group ref={ship} position={[0, 0, SHIP_POS_Z]} onPointerUp={() => null} dispose={null}>
        {meshes}
        {/* <mesh
          visible
          castShadow
          receiveShadow
          geometry={objGeometry}
          // material={materials.DefaultWhite}
          scale={controlsData_spaceShipModel.scale}
        >
          <meshStandardMaterial
            attach="material"
            color="white"
            roughness={1}
            metalness={0}
            fog={false}
          />
        </mesh> */}
      </group>
      <mesh position={[0, 0, SHIP_POS_Z - 2]} onClick={handleOnShoot}>
        <planeGeometry attach="geometry" args={[100, 100]} />
        <meshStandardMaterial
          attach="material"
          color="orange"
          emissive="#ff0860"
          visible={false}
          fog={false}
        />
      </mesh>
    </>
  );
};

export default SpaceShipModel;
