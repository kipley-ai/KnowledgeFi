import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpotLight, useDepthBuffer } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const CustomSpotLights = (props) => {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  let ref = useRef();

  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        // trigger: '.section-2',
        // start: 'top 95%',
        // end: 'top 10%',
        trigger: '.section-1',
        start: 'bottom 95%',
        endTrigger: '.Home',
        end: 'bottom top',
        markers: false,
        invalidateOnRefresh: true,
        toggleActions: 'play reverse play reverse',
      },
    });
    // tl.fromTo(
    //   ref.current,
    //   {
    //     visible: false,
    //   },
    //   {
    //     visible: true,
    //     delay: 4.6,
    //   }
    // );

    return () => {
      tl.kill();
    };
  }, []);
  return (
    <group ref={ref}>
      <MovingSpotLight
        color="#ffffff"
        position={[0, 5.5, 0]}
        speed={0.8}
        // depthBuffer={depthBuffer}
        {...props}
      />
      <MovingSpotLight
        color="#ffffff"
        position={[-0.25, 5.5, 0]}
        speed={0.4}
        // depthBuffer={depthBuffer}
        {...props}
      />
      <MovingSpotLight
        color="#ffffff"
        position={[0.25, 5.5, 0]}
        speed={0.7}
        inverse={false}
        // depthBuffer={depthBuffer}
        {...props}
      />
      <MovingSpotLight
        color="#ffffff"
        position={[0, 5.5, 0]}
        speed={0.5}
        inverse={false}
        // depthBuffer={depthBuffer}
        {...props}
      />
    </group>
  );
};

export default CustomSpotLights;

function MovingSpotLight({ speed = 1, inverse = false, ...restProps }) {
  const ref = useRef();
  //   const depthBuffer = useDepthBuffer({ frames: 1 });
  let minMaxAngle_x = 3;
  let speed_x = 0.9 * speed;
  let minMaxAngle_z = 3;
  let speed_z = 0.6 * speed;
  let isInverse = inverse ? -1 : 1;
  let formula = Math.sin;
  // formula = Math.tan;

  useFrame((state, delta) => {
    let newX = formula(state.clock.elapsedTime * speed_x) * minMaxAngle_x * isInverse;
    let newZ = formula(state.clock.elapsedTime * speed_z) * minMaxAngle_z * isInverse;

    ref.current.target.position.x = newX;
    ref.current.target.position.z = newZ;
  });

  return (
    <SpotLight
      castShadow
      ref={ref}
      penumbra={1}
      distance={10}
      angle={0.35}
      attenuation={5}
      anglePower={4}
      intensity={2}
      {...restProps}
    />
  );
}
