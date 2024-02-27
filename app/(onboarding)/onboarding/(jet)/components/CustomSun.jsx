import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import * as THREE from 'three';

extend({ EffectComposer, RenderPass, UnrealBloomPass });

function Bloom({ children }) {
  const { gl, camera, size } = useThree();
  const [scene, setScene] = useState();
  const composer = useRef();
  useEffect(() => void scene && composer.current.setSize(size.width, size.height), [size]);
  useFrame(() => scene && composer.current.render(), 1);
  return (
    <>
      <scene ref={setScene}>{children}</scene>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <unrealBloomPass attachArray="passes" args={[undefined, 1.5, 1, 0]} />
      </effectComposer>
    </>
  );
}

const Sun = (props) => {
  const { position = [0, 0, 0], radius = 4 } = props;
  const color = new THREE.Color('#FDB813');

  return (
    // <Bloom>
    <Sphere position={position} args={[radius, 15]}>
      <meshBasicMaterial args={[{ color: color, fog: false }]} />
    </Sphere>
    // </Bloom>
  );
};

export default Sun;
