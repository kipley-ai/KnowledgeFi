import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useThree } from '@react-three/fiber';
import Color from 'color';

gsap.registerEffect({
  name: 'animateAll',
  effect: (targets, config = {}) => {
    const {
      camera,
      scene,
      sunTriggerValue,
      sunTriggerValue2,
      forwardSunRef,
      initialPositionY,
      finalPositionY,
      bgDuration,
      newBgColor,
      setEnableGodRay,
    } = config;
    const tl = gsap.timeline({
      paused: true,
    });
    tl.to('.canvas-static-wrapper', {
      opacity: 0,
      duration: 0.75,
      ease: 'power1.out',
    })
      .to(camera.position, {
        y: -initialPositionY - 20,
        duration: 2,
        ease: 'power1.inOut',
      })
      .add('animateDive')
      .to(
        camera.position,
        {
          y: finalPositionY,
          duration: bgDuration,
          ease: 'power1.out',
        },
        'animateDive'
      )
      .to(
        scene.background,
        {
          ...newBgColor,
          duration: bgDuration,
        },
        'animateDive'
      )
      .to(
        scene.fog.color,
        {
          ...newBgColor,
          duration: bgDuration,
        },
        'animateDive'
      )
      .to(
        camera,
        {
          far: 100, // 15
          duration: bgDuration,
        },
        'animateDive'
      )
      .to(
        sunTriggerValue,
        {
          value: 1,
          duration: bgDuration - 0.25,
          onComplete: () => {
            setEnableGodRay(true);
          },
        },
        'animateDive'
      )
      .to(
        sunTriggerValue2,
        {
          value: 1,
          delay: bgDuration - 0.25,
          onReverseComplete: () => {
            setEnableGodRay(false);
          },
        },
        'animateDive'
      )
      .to(
        forwardSunRef.current.rotation,
        {
          x: -Math.PI,
          // duration: 0.5,
          delay: bgDuration - 0.25,
        },
        'animateDive'
      )
      .to('.canvas-static-wrapper-2', {
        opacity: 1,
        duration: 0.75,
      });
    return tl;
  },
  extendTimeline: true,
});

const ScrollController = React.forwardRef((props, forwardSunRef) => {
  const {
    finalPositionY = -100,
    initialPositionY,
    rotateX = -0.5,
    swiperSlideStatus,
    enableGodRay,
    setEnableGodRay,
    setEnableSwiper,
    section2BgColor = '#000000',
    godRaysEffectProps = {},
    controlsData_terrain = {},
  } = props;
  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);
  const three = useThree();

  let activeIndex = swiperSlideStatus?.activeIndex;

  let timeline = useRef(null);

  var sunTriggerValue = { value: 0 };
  var sunTriggerValue2 = { value: 0 };
  let section2BgColorThree = Color(section2BgColor).rgb().array();
  let newBgColor = {
    r: section2BgColorThree[0] / 255,
    g: section2BgColorThree[1] / 255,
    b: section2BgColorThree[2] / 255,
  };

  let bgDuration = 1.25;
  useEffect(() => {
    if (timeline.current) {
      timeline.current.kill();
    }
    timeline.current = gsap.effects.animateAll(undefined, {
      camera,
      scene,
      sunTriggerValue,
      sunTriggerValue2,
      forwardSunRef,
      initialPositionY,
      finalPositionY,
      bgDuration,
      newBgColor,
      setEnableGodRay,
    });

    return () => {
      timeline.current.kill();
    };
  }, [newBgColor.r]);

  useEffect(() => {
    let isDown = swiperSlideStatus?.isDown;
    let isUp = swiperSlideStatus?.isUp;

    if (activeIndex == 0) {
      if (isDown) {
      } else if (isUp) {
        // setEnableGodRay(false);
        timeline.current.reverse();
        // timeline.current.progress(0);
      } else {
      }
    } else if (activeIndex == 1) {
      if (isDown) {
        timeline.current.progress(1);
        // timeline.current.play(1);
      } else if (isUp) {
        timeline.current.progress(1);
        // timeline.current.play(1);
      } else {
        timeline.current.progress(1);
      }
    } else {
      if (isDown) {
      } else if (isUp) {
        timeline.current.progress(1);
      } else {
        timeline.current.progress(1);
      }
    }
  }, [activeIndex]);

  return null;
});

export default ScrollController;
