import { useState, useRef, useMemo, useEffect } from 'react';

import { useControls } from 'leva';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  SpotLight,
  Box as DreiBox,
  useDepthBuffer,
  PerspectiveCamera,
  Points,
  PointMaterial,
} from '@react-three/drei';
import { SimplexNoise, ImprovedNoise } from 'three-stdlib';
import * as random from 'maath/random/dist/maath-random.esm';

function Stars(props) {
  const {
    position = [0, 0, 0],
    speed = 1,
    color = '#ffa0e0',
    size = 0.02, //0.005
    radius = 10, //1.5
    numberOfStars = 5000,
    ...restProps
  } = props;
  const ref = useRef();

  const [sphere, setSphere] = useState(() => {
    return random.inSphere(new Float32Array(numberOfStars), { radius: radius });
  });

  useEffect(() => {
    setSphere(random.inSphere(new Float32Array(numberOfStars), { radius: radius }));
  }, [radius]);

  let speedX = 10 / speed;
  let speedY = 15 / speed;
  useFrame((state, delta) => {
    ref.current.rotation.x += delta / speedX;
    // ref.current.rotation.y -= delta / speedY;
  });
  return (
    <group
      position={position}
      // rotation={[0, 0, Math.PI / 4]}
    >
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...restProps}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default Stars;
