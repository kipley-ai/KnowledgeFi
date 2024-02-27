import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { EffectComposer, GodRays } from '@react-three/postprocessing';
import { BlendFunction, Resizer, KernelSize } from 'postprocessing';
import { useControls } from 'leva';

const SunEffect = React.forwardRef((props, forwardRef) => {
  const { sunProps = {}, godRaysProps = {}, enabled = false } = props;

  const sunRef = forwardRef || useRef();
  const godRaysRef = useRef();
  // console.log('EffectComposer', godRaysRef);
  return (
    <>
      <pointLight
        color={sunProps?.color}
        intensity={1}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        castShadow={true}
        distance={100} // 100
        shadow-camera-far={10000}
        position={[0, 0, 0]}
      />
      <Sun ref={sunRef} {...sunProps} />
      {sunRef.current && (
        <EffectComposer multisampling={0} enabled={enabled}>
          <GodRays
            // ref={godRaysRef}
            sun={sunRef.current}
            blendFunction={BlendFunction.SCREEN}
            samples={30}
            density={0.97}
            decay={0.96}
            weight={0.6}
            exposure={0.4}
            clampMax={1}
            width={Resizer.AUTO_SIZE}
            height={Resizer.AUTO_SIZE}
            kernelSize={KernelSize.SMALL}
            blur={true}
            {...godRaysProps}
          />
        </EffectComposer>
      )}
    </>
  );
});

export default SunEffect;

const Sun = React.forwardRef(function Sun(props, forwardRef) {
  const { position = [0, 0, 0], rotation = [0, 0, 0], size, ...restProps } = props;

  // circle
  return (
    <mesh ref={forwardRef} position={position} rotation={rotation}>
      <circleGeometry args={[size, 64 / 2]} />
      <meshBasicMaterial
        // side={THREE.DoubleSide}
        side={THREE.BackSide}
        transparent={true}
        fog={false}
        {...restProps}
      />
    </mesh>
  );

  // sphere
  return (
    <mesh ref={forwardRef}>
      <sphereGeometry args={[1, 36, 36]} />
      <meshBasicMaterial color={'#00FF00'} transparent={true} {...restProps} />
    </mesh>
  );
});
