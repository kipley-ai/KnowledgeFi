import { useState, useRef, useMemo, useEffect } from 'react';
import { useControls } from 'leva';
import * as THREE from 'three';
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { SimplexNoise, ImprovedNoise } from 'three-stdlib';

const CustomTerrain = (props) => {
  const { position, rotation, ...restProps } = props;
  return (
    <group position={position} rotation={rotation}>
      {/* <Mountains {...restDatas} /> */}
      <GroundPlain {...restProps} />
    </group>
  );
};

export default CustomTerrain;

const Mountains = (props) => {
  const {
    speed = 0.009,
    xZoom = 4, // 6
    yZoom = 4, // 18
    noiseStrength = 1.5, // 1.5
  } = props;
  let cycle = 0;
  let simplex = new SimplexNoise();

  let ref = useRef();
  let geometryRef = useRef();

  const texture = useLoader(THREE.TextureLoader, '/terrain2.jpeg');
  texture.wrapT = THREE.RepeatWrapping;
  texture.wrapS = THREE.RepeatWrapping;

  let factor = 1000; // smoothness
  let scale = 5000;

  const movePlain = (geometryRef) => {
    const positions = geometryRef.current.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      let xoff = positions[i] / xZoom;
      let yoff = positions[i + 1] / yZoom + cycle;
      let rand = simplex.noise(xoff, yoff) * noiseStrength;
      positions[i + 2] = rand;
    }
    geometryRef.current.attributes.position.needsUpdate = true;
    cycle -= speed;
  };
  useFrame((state) => {
    movePlain(geometryRef);
  });

  return (
    <mesh ref={ref}>
      <planeGeometry ref={geometryRef} args={[40, 40, 120, 120]} />
      <meshPhongMaterial
        args={[
          {
            // color: 0xffffff,
            opacity: 1,
            map: texture,
            blending: THREE.NoBlending,
            side: THREE.BackSide,
            transparent: false,
            depthTest: false,
            // fog: false,
          },
        ]}
      />
    </mesh>
  );
};

const GroundPlain = (props) => {
  const {
    speed = 0.009,
    xZoom = 4, // 6
    yZoom = 4, // 18
    noiseStrength = 1.5, // 1.5
  } = props;
  let cycle = 0;

  let simplex = new SimplexNoise();

  let ref = useRef();
  let geometryRef = useRef();

  const moveNoise = (geometryRef) => {
    const positions = geometryRef.current.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      let xoff = positions[i] / xZoom;
      let yoff = positions[i + 1] / yZoom + cycle;
      let rand = simplex.noise(xoff, yoff) * noiseStrength;
      positions[i + 2] = rand;
    }
    geometryRef.current.attributes.position.needsUpdate = true;
    cycle += speed;
  };

  useFrame((state) => {
    moveNoise(geometryRef);
  });

  return (
    <mesh ref={ref}>
      <planeGeometry ref={geometryRef} args={[40 * 1.5, 40 * 1.5, 100, 100]} />
      <meshLambertMaterial
        args={[
          {
            // color: 0xffffff,
            opacity: 1,
            blending: THREE.NoBlending,
            // side: THREE.FrontSide,
            side: THREE.DoubleSide,
            transparent: false,
            depthTest: false,
            wireframe: true,
          },
        ]}
      />
    </mesh>
  );
};

// const StarField = ()=>{

//   const texture = useLoader(THREE.TextureLoader, '/star.png');
//   let ref = useRef();
//   let geometryRef = useRef();

//   const pushStar = (geometryRef) => {
//     // const positions = geometryRef.current.attributes.position.array;
//     // for (let i = 0; i < positions.length; i += 3) {
//     //   let xoff = positions[i] / xZoom;
//     //   let yoff = positions[i + 1] / yZoom + cycle;
//     //   let rand = simplex.noise(xoff, yoff) * noiseStrength;
//     //   positions[i + 2] = rand;
//     // }
//     // geometryRef.current.attributes.position.needsUpdate = true;
//     // cycle += speed;
//   };

//   useFrame((state) => {
//     pushStar(geometryRef);
//   });

//   return (
//     <points>
//       <geometry ref={geometryRef}/>
//       <pointsMaterial args={[{
//          size: 64,
//          color: 0xffffff,
//          opacity: 1,
//          map: texture,
//          blending: THREE.AdditiveBlending,
//          vertexColors: false,
//          transparent: false,
//          depthTest: false,
//       }]} />
//     </points>
//   )
// }
// const starField = {
//   group: null,
//   total: 400,
//   spread: 8000,
//   zoom: 1000,
//   ease: 12,
//   move: { x: 0, y: 1200, z: -1000 },
//   look: { x: 0, y: 0, z: 0 },

//   // create
//   create(scene) {
//     this.group = new THREE.Object3D();
//     this.group.position.set(this.move.x, this.move.y, this.move.z);
//     this.group.rotation.set(this.look.x, this.look.y, this.look.z);

//     let geometry = new THREE.Geometry();
//     let material = new THREE.PointsMaterial({
//       size: 64,
//       color: 0xffffff,
//       opacity: 1,
//       map: LoaderHelper.get('starTexture'),
//       blending: THREE.AdditiveBlending,
//       vertexColors: false,
//       transparent: false,
//       depthTest: false,
//     });

//     for (let i = 0; i < this.total; i++) {
//       let angle = Math.random() * Math.PI * 2;
//       let radius = THREE.Math.randInt(0, this.spread);

//       geometry.vertices.push(
//         new THREE.Vector3(
//           Math.cos(angle) * radius,
//           (Math.sin(angle) * radius) / 10,
//           THREE.Math.randInt(-this.spread, 0)
//         )
//       );
//     }
//     this.group.add(new THREE.Points(geometry, material));
//     scene.add(this.group);
//   },

//   // update
//   update(mouse) {
//     this.move.x = -(mouse.x * 0.005);
//     addEase(this.group.position, this.move, this.ease);
//     addEase(this.group.rotation, this.look, this.ease);
//   },
// };
