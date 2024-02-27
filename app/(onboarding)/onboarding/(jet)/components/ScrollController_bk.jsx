import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useThree } from '@react-three/fiber';
import Color from 'color';

const ScrollController = (props) => {
  const {
    finalPositionY = -100,
    initialPositionY,
    rotateX = -0.5,
    swiperSlideStatus,
    enableGodRay,
    setEnableGodRay,
    setEnableSwiper,
    section2BgColor = '#000000',
  } = props;
  const camera = useThree((state) => state.camera);
  const scene = useThree((state) => state.scene);
  const three = useThree();
  // console.log('three', three);

  let activeIndex = swiperSlideStatus?.activeIndex;

  let timelineOnComplete = useCallback(() => {
    console.log('timelineOnComplete', activeIndex);
    // if (activeIndex == 0 || activeIndex == 1) {
    //   if (setEnableSwiper) {
    //     setEnableSwiper(true);
    //   }
    // }
    if (activeIndex == 0) {
      setEnableGodRay(false);
    } else {
      setEnableGodRay(true);
    }
  }, [activeIndex]);

  let timelineOnReverseComplete = useCallback(() => {
    console.log('timelineOnReverseComplete');
    if (activeIndex == 0) {
      setEnableGodRay(false);
    } else {
      setEnableGodRay(true);
    }
  }, [activeIndex]);

  let timeline = useRef(null);

  let section2BgColorThree = Color(section2BgColor).rgb().array();
  let newBgColor = {
    r: section2BgColorThree[0] / 255,
    g: section2BgColorThree[1] / 255,
    b: section2BgColorThree[2] / 255,
  };

  let bgDuration = 0.5; //

  let enableRay = { value: 0 };
  // console.log('enableRay', enableRay);

  useEffect(() => {
    timeline.current = gsap.timeline({
      paused: true,
      // onComplete: timelineOnComplete,
      // onReverseComplete: timelineOnReverseComplete,
    });

    timeline.current
      .to('.canvas-static-wrapper', {
        opacity: 0,
        // zIndex: -2,
        duration: 0.75,
        ease: 'power1.out',
      })
      .to(camera.position, {
        y: -initialPositionY - 30, //12
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
          far: 80, // 15
          duration: bgDuration,
        },
        'animateDive'
      )
      .to(
        '.App',
        {
          opacity: 1,
          delay: 0.25,
          // onStart: () => {
          //   if (!enableGodRay) {
          //     setEnableGodRay(true);
          //   }
          // },
          onUpdate: () => {
            console.log('asasas', activeIndex);
          },
          onStart: () => {
            console.log('onStart', activeIndex);
          },
        },
        'animateDive'
      )
      .to('.canvas-static-wrapper-2', {
        opacity: 1,
        duration: 0.75,
      });

    return () => {
      timeline.current.kill();
    };
  }, []);

  useEffect(() => {
    let isDown = swiperSlideStatus?.isDown;
    let isUp = swiperSlideStatus?.isUp;
    if (activeIndex == 0) {
      if (enableGodRay) {
        handleTimeout(() => setEnableGodRay(false), 1000);
      }
      if (isDown) {
      } else if (isUp) {
        // if (activeIndex == 0 || activeIndex == 1) {
        //   if (setEnableSwiper) {
        //     console.log('onStartonStart');
        //     setEnableSwiper(false);
        //   }
        // }
        timeline.current.reverse();
      } else {
      }
    } else if (activeIndex == 1) {
      if (isDown) {
        timeline.current.play();
      } else if (isUp) {
        setEnableGodRay(true);
        timeline.current.progress(1);
      } else {
        setEnableGodRay(true);
        timeline.current.progress(1);
        // timeline.current.play();
      }

      // handleTimeout(() => setEnableGodRay(true), 3000);
      // if (isDown) {
      //   timeline.current.play();
      // }
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
};

const handleTimeout = (callback, duration = 2000) => {
  let timeout = setTimeout(function () {
    if (callback) {
      callback();
    }
  }, duration);

  return () => {
    clearTimeout(timeout);
  };
};

export default ScrollController;
