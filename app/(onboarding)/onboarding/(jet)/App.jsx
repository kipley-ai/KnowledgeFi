import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
  Mousewheel,
  Keyboard,
  Pagination,
  Controller,
  HashNavigation,
} from "swiper";
import Box from "@mui/material/Box";

import LoadingOverlay from "@/components/LoadingOverlay";
import GetInvolvedButton from "@/components/GetInvolvedButton/get-involved-button";
import useBreakpoints from "@/hooks/useBreakpoints";
import MainCanvas from "./main-canvas";

import {
  showLoadingProgress,
  showLoaderOnMobile as showLoaderOnMobileDefault,
} from "./Constants";

import "./App.css";
import "animate.css";
import { useCreateChatbotContext } from "../../create-knowledge-context";

let hideText = false;

function App() {
  const { setWelcomePage } = useCreateChatbotContext();
  const breakpoints = useBreakpoints();
  const { belowBreakpoint, belowXS, belowSM } = breakpoints;

  const [swiperSlideStatus, setSwiperSlideStatus] = useState({
    previousIndex: 1,
    activeIndex: 2,
    direction: "down",
    isUp: true,
    isDown: false,
  });

  const [enableSwiper, setEnableSwiper] = useState(true);
  const [controlledSwiper, setControlledSwiper] = useState(null);
  console.log("swiperSlideStatus", swiperSlideStatus);

  const containerRef = useRef();
  const trackingRef = useRef();
  const [hideLoadingOverlay, setHideLoadingOverlay] = useState(true);

  let speed = 1000;

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
    } else {
      result = false;
    }

    return result;
  };
  // let isMobileDevices = checkDeviceIsMobile();
  // let showLoaderOnMobile = !belowSM;
  // let showLoaderOnMobile = !isMobileDevices;
  // let enableLoader = showLoadingProgress && showLoaderOnMobile;

  const isMobileDevices = checkDeviceIsMobile();

  const hideText = true;

  return (
    <div className="App">
      <div className="app-wrapper relative" ref={containerRef}>
        <MainCanvas
          swiperSlideStatus={swiperSlideStatus}
          setEnableSwiper={setEnableSwiper}
          ref={containerRef}
          isMobileDevices={isMobileDevices}
          hideText={hideText}
        />
        <div className="absolute bottom-20 flex w-full flex-row justify-center">
          <button
            className="rounded-md bg-aqua-700 px-6 py-3"
            onClick={() => setWelcomePage("kip-video")}
          >
            <span className="text-sm font-bold text-black">EXPLORE NOW</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
