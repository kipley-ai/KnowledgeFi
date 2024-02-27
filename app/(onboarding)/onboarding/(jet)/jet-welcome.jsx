"use client";

import { useState, useRef } from 'react';
import MainCanvas from './main-canvas';

import './App.css';

const JetWelcome = () => {
  const [swiperSlideStatus, setSwiperSlideStatus] = useState({
    previousIndex: 0,
    activeIndex: 1,
    direction: 'down',
    isUp: false,
    isDown: true,
  });

  const [enableSwiper, setEnableSwiper] = useState(true);
  const containerRef = useRef();

  const checkDeviceIsMobile = () => {
    let result = false;
    if (
      window.navigator.userAgent.match(/Android/i) ||
      window.navigator.userAgent.match(/webOS/i) ||
      window.navigator.userAgent.match(/iPhone/i) ||
      window.navigator.userAgent.match(/iPad/i) ||
      window.navigator.userAgent.match(/iPod/i) ||
      window.navigator.userAgent.match(/BlackBerry/i) ||
      window.navigator.userAgent.match(/Windows Phone/i)
    ) {
      result = true;
    }

    return result;
  };
  const isMobileDevices = checkDeviceIsMobile();

  const hideText = false;

  return (
    <div className="app-wrapper font-mono" ref={containerRef}>
      <MainCanvas
        swiperSlideStatus={swiperSlideStatus}
        setEnableSwiper={setEnableSwiper}
        ref={containerRef}
        isMobileDevices={isMobileDevices}
        hideText={hideText}
      />
    </div>
  );
};

export default JetWelcome;
