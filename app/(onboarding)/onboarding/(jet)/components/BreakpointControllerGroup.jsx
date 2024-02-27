import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import useBreakpoints from '@/hooks/useBreakpoints';

const BreakpointControllerGroup = (props) => {
  const { children } = props;
  const ref = useRef();
  const { camera } = useThree();

  let breakPoint = 600;
  let mobileScale = 0.4; // 0.6

  useEffect(() => {
    let mm = gsap.matchMedia();
    if (ref) {
      mm.add(
        {
          // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
          isDesktop: `(min-width: ${breakPoint + 300}px)`,
          isTablet: `(min-width: ${breakPoint}px)`,
          isMobile: `(max-width: ${breakPoint - 1}px)`,
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
          let { isDesktop, isMobile, isTablet, reduceMotion } = context.conditions;

          const w = window.innerWidth;
          const h = window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          if (isDesktop) {
            gsap.to(ref.current.scale, {
              x: 1,
              y: 1,
              z: 1,
            });
          }
          if (isTablet) {
            gsap.to(ref.current.scale, {
              x: mobileScale * 1.7,
              y: mobileScale * 1.7,
              z: mobileScale * 1.7,
            });
          }
          if (isMobile) {
            gsap.to(camera.position, {
              y: '-=0.6',
            });
            gsap.to(ref.current.scale, {
              x: mobileScale,
              y: mobileScale,
              z: mobileScale,
            });
          }

          return () => {
            // mm.kill(true);
            // mm.revert();
            // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
            // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
          };
        }
      );
    }
    return () => {
      mm.kill(true);
    };
  }, [ref]);

  return <group ref={ref}>{children}</group>;
};

export default BreakpointControllerGroup;
