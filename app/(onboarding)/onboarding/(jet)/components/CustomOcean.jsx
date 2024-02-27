import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { Water } from 'three-stdlib';

extend({ Water });

const CustomOcean = (props) => {
  const {
    flowSpeed = 0.8, // interval 0.1
    scale = 10000,
    distortionScale = 1.7, // wave texture 3.7
    waterColor = 0x166b64,
  } = props;
  const ref = useRef();
  const gl = useThree((state) => state.gl);

  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg');
  waterNormals.wrapS = THREE.RepeatWrapping;
  waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(scale, scale), []);

  let textureSize = 512; // 512

  // useEffect(() => {
  //   console.log('ocean ref', ref);
  // }, [ref]);

  const config = useMemo(
    () => ({
      textureWidth: textureSize,
      textureHeight: textureSize,
      waterNormals,
      // sunDirection: new THREE.Vector3(-scale / 2, 0, 0),
      sunDirection: new THREE.Vector3(-100, 10, 0),
      // sunColor: 0xffffff,
      // waterColor: 0x166b64,
      sunColor: 0x2d2d2d,
      // sunColor: 0x949494,
      waterColor: waterColor,
      distortionScale: distortionScale,
      fog: true,
      format: gl.encoding,
      side: THREE.DoubleSide,
    }),
    [waterNormals, distortionScale, waterColor]
  );

  // console.log('ref.current.material', ref.current.material);
  useFrame((state, delta) => {
    return (ref.current.material.uniforms.time.value += delta * flowSpeed);
  });

  let rotateX = -Math.PI / 2;
  let rotateY = 0.1;

  return (
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={rotateX}
      rotation-y={rotateY}
      // material-transparent={true}
      // material-fog={true}
      // material-uniforms-fogFar-value={15}
      // material-uniforms-fogDensity={0.0025}
      // material-uniforms-fogColor-value={'#ffffff'}
    />
  );
};

export default CustomOcean;
