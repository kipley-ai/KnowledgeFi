import React, { useState, useRef, useMemo, Suspense, useEffect } from 'react';
import SunEffect from './SunEffect';

const CustomGodray = React.forwardRef((props, forwardRef) => {
  const {
    enabled = true,

    godRaysGeneralProps,
    godRaysEffectProps,
  } = props;

  let ref = useRef();
  let sunEffectRef = forwardRef || useRef();

  return (
    <group
      ref={ref}
      //   position={controlsData_godray.position}
      //   rotation={controlsData_godray.rotation}
    >
      <SunEffect
        ref={sunEffectRef}
        // rotation={controlsData_godray.rotation}
        // lookAt={controlsData_godray.lookAt}
        // size={controlsData_godray.size}
        // color={controlsData_godray.color}
        sunProps={godRaysGeneralProps}
        godRaysProps={godRaysEffectProps}
        enabled={enabled}
        // {...controlsData_godray}
      />
    </group>
  );
});

export default CustomGodray;
