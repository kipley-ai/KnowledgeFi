import React, { useState, useRef, useMemo, Suspense, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useControls } from "leva";
import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";

import useBreakpoints from "@/hooks/useBreakpoints";
import LoadingOverlay from "@/components/LoadingOverlay";

import ScrollController from "./components/ScrollController";
import CustomOcean from "./components/CustomOcean";
import CustomText2D from "./components/CustomText2D";
import BreakpointControllerGroup from "./components/BreakpointControllerGroup";
import RigGroup from "./components/RigGroup";
import CustomTerrain from "./components/CustomTerrain";
import CustomStars from "./components/CustomStars";
import CustomGodray from "./components/CustomGodray";

import SpaceShip from "./components/SpaceShip";
import {
  scale,
  farMutiplier,
  initialY,
  page2PositionY,
  controllerObj_general,
  controllerObj_title,
  controllerObj_ocean,
  controllerObj_stars,
  controllerObj_title2,
  controllerObj_terrain,
  controllerObj_godray_general,
  controllerObj_godray_effect,
} from "./Constants";

import "./mainCanvas.css";

let enableOrbitControl = false;

const defaultValues = {
  initialCameraPosition: [-5, Math.PI / 2, 0],
  initialCameraRotation: new THREE.Euler(0, -Math.PI / 2, 0, "ZYX"),
};

const getControllerValues = (obj = {}) => {
  let result = {};
  let keys = Object.keys(obj);
  keys.forEach((aKey) => {
    let value = obj[aKey];
    if (typeof value == "object" && value?.value != undefined) {
      result[aKey] = value?.value;
    } else {
      result[aKey] = value;
    }
  });
  return result;
};

let controllerObj_general_value = getControllerValues(controllerObj_general);
let controllerObj_title_value = getControllerValues(controllerObj_title);
let controllerObj_ocean_value = getControllerValues(controllerObj_ocean);
let controllerObj_stars_value = getControllerValues(controllerObj_stars);
let controllerObj_title2_value = getControllerValues(controllerObj_title2);
let controllerObj_terrain_value = getControllerValues(controllerObj_terrain);

let controllerObj_godray_general_value = getControllerValues(
  controllerObj_godray_general,
);
let controllerObj_godray_effect_value = getControllerValues(
  controllerObj_godray_effect,
);

// -------------------------------------------------------------- Const End

const MainCanvas = React.forwardRef((props, forwardRef) => {
  const {
    swiperSlideStatus,
    setEnableSwiper,
    isMobileDevices,
    hideText = false,
  } = props;

  const canvasCameraRef = useRef();
  const sunRef = useRef();
  const [enableGodRay, setEnableGodRay] = useState(true);
  const [shrinkCanvas, setShrinkCanvas] = useState(false);

  const { belowXS, belowSM, belowLG } = useBreakpoints();

  // -------------------------------------------------------------- Controller Start

  const controlsData_general_value = useControls("General", {
    backgroundColor: controllerObj_general.backgroundColor,
  });
  const controlsData_title_value = useControls("Title", {
    value: controllerObj_title.value,
    topLabel: controllerObj_title.topLabel,
    description: controllerObj_title.description,
  });
  const controlsData_ocean_value = useControls("Ocean", {
    customColor: controllerObj_ocean.customColor,
    waterColor: controllerObj_ocean.waterColor,
  });
  // const controlsData_stars_value = useControls('Stars', controllerObj_stars);
  const controlsData_stars_value = {};
  // const controlsData_terrain_value = useControls('Terrain', {
  //   speed: controllerObj_terrain.speed,
  // });
  const controlsData_terrain_value = {};
  const controlsData_title2_value = useControls("Section 2", {
    backgroundColor: controllerObj_title2.backgroundColor,
    value: controllerObj_title2.value,
    text1: controllerObj_title2.text1,
    text2: controllerObj_title2.text2,
    text3: controllerObj_title2.text3,
  });

  const controlsData_sun_value = useControls("Sun", {
    color: controllerObj_godray_general.color,
    ...controllerObj_godray_general,
  });
  const controlsData_effect_value = useControls("Sun ray Effect", {
    samples: controllerObj_godray_effect.samples,
    density: controllerObj_godray_effect.density,
    // decay: controllerObj_godray_effect.decay,
    weight: controllerObj_godray_effect.weight,
    exposure: controllerObj_godray_effect.exposure,
    // clampMax: controllerObj_godray_effect.clampMax,
    blur: controllerObj_godray_effect.blur,
    blendFunction: controllerObj_godray_effect.blendFunction,
  });
  // const controlsData_effect_value = {};

  const controlsData_general = {
    ...controllerObj_general_value,
    ...controlsData_general_value,
  };
  const controlsData_title = {
    ...controllerObj_title_value,
    ...controlsData_title_value,
  };
  const controlsData_ocean = {
    ...controllerObj_ocean_value,
    ...controlsData_ocean_value,
  };
  const controlsData_stars = {
    ...controllerObj_stars_value,
    ...controlsData_stars_value,
  };
  const controlsData_title2 = {
    ...controllerObj_title2_value,
    ...controlsData_title2_value,
  };
  let controlsData_terrain = {
    ...controllerObj_terrain_value,
    ...controlsData_terrain_value,
  };
  let controlsData_godray_general = {
    ...controllerObj_godray_general_value,
    ...controlsData_sun_value,
  };
  let controlsData_godray_effect = {
    ...controllerObj_godray_effect_value,
    ...controlsData_effect_value,
  };

  // -------------------------------------------------------------- Controller End

  useEffect(() => {
    setTimeout(() => {
      setShrinkCanvas(true);
    }, 3000);
  }, []);

  return (
    <div
      className="canvas-container"
      style={shrinkCanvas ? { width: "99%" } : {}}
    >
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{
            position: defaultValues.initialCameraPosition,
            rotation: defaultValues.initialCameraRotation,
            fov: 75,
            far: 15 * farMutiplier, // 15
            aspect: window.innerWidth / window.innerHeight,
            ref: canvasCameraRef,
          }}
          shadows
          eventSource={forwardRef}
          // frameloop="demand"
        >
          <fog
            attach="fog"
            args={[
              controlsData_general.backgroundColor,
              controlsData_general.fogNear,
              controlsData_general.fogFar,
            ]}
          />
          <color
            attach={"background"}
            args={[controlsData_general.backgroundColor]}
          />
          <BreakpointControllerGroup>
            <CustomOcean
              scale={scale}
              {...controlsData_ocean}
              waterColor={
                controlsData_ocean.customColor
                  ? controlsData_ocean.waterColor
                  : controlsData_general.backgroundColor
              }
            />
            {hideText ? null : isMobileDevices ? null : (
              <RigGroup>
                <CustomText2D
                  position={controlsData_title.position}
                  rotation={controlsData_title.rotation}
                  size={controlsData_title.size}
                >
                  {controlsData_title.value}
                </CustomText2D>
              </RigGroup>
            )}
          </BreakpointControllerGroup>
          <group
            position={[0, page2PositionY, 0]}
            rotation={controlsData_title.rotation}
          >
            <CustomStars {...controlsData_stars} />
            <CustomGodray
              ref={sunRef}
              enabled={enableGodRay}
              godRaysGeneralProps={controlsData_godray_general}
              godRaysEffectProps={controlsData_godray_effect}
            />
            <CustomTerrain {...controlsData_terrain} />
            <SpaceShip />
          </group>
          <group
            position={[20, page2PositionY * 1.02, 0]}
            rotation={controlsData_title.rotation}
          >
            <BreakpointControllerGroup>
              <CustomText2D
                position={controlsData_title2.position}
                size={5}
                rotation={[0, 0, 0]}
              >
                {controlsData_title2_value.value}
              </CustomText2D>
            </BreakpointControllerGroup>
          </group>
          <ScrollController
            initialPositionY={initialY}
            finalPositionY={page2PositionY}
            rotateX={-0.7}
            swiperSlideStatus={swiperSlideStatus}
            enableGodRay={enableGodRay}
            setEnableGodRay={setEnableGodRay}
            setEnableSwiper={setEnableSwiper}
            section2BgColor={controlsData_title2.backgroundColor}
            godRaysEffectProps={controlsData_godray_effect}
            ref={sunRef}
            controlsData_terrain={controlsData_terrain}
          />
        </Canvas>
      </Suspense>

      {hideText ? null : isMobileDevices ? (
        <>
          <div className="canvas-static-wrapper app-slide-1-mobile">
            <div className="canvas-static-site-title">
              {controlsData_title?.topLabel}
            </div>
            <div
              className="canvas-static-main-title"
              style={{
                fontFamily: "Helvetica Neue, Arial, serif",
                fontFamily: "Helvetica",
                fontWeight: "bold",
                fontSize: `${controlsData_title.size * (belowSM ? 40 : 60)}px`,
                paddingTop: `${controlsData_title.size * (belowSM ? 15 : 10)}%`,
              }}
            >
              {controlsData_title?.value}
            </div>
            <div
              className="canvas-static-description"
              style={{ paddingTop: "15%" }}
            >
              {controlsData_title?.description}
            </div>
            <div className="canvas-static-scroll-indicator">
              <div className="canvas-static-scroll-indicator-label">
                Scroll down
              </div>
              <div className="canvas-static-scroll-indicator-icon">
                <div className="animate__animated animate__bounce animate__infinite animate__slow animate__delay-2s"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="canvas-static-wrapper">
          <div className="canvas-static-site-title">
            {controlsData_title?.topLabel}
          </div>
          <div
            className="canvas-static-description"
            style={belowSM ? { paddingTop: "60%" } : {}}
          >
            {controlsData_title?.description}
          </div>
          <div className="canvas-static-scroll-indicator">
            <div className="canvas-static-scroll-indicator-label">
              Scroll down
            </div>
            <div className="canvas-static-scroll-indicator-icon">
              <div className="animate__animated animate__bounce animate__infinite animate__slow animate__delay-2s"></div>
            </div>
          </div>
        </div>
      )}

      <Section2 />
    </div>
  );
});

export default MainCanvas;

function Fallback() {
  return;
}

const Section2 = () => {
  const { belowXS, belowSM, belowLG } = useBreakpoints();
  return (
    <Box
      className="canvas-static-wrapper-2"
      display="flex"
      // display="none"
      alignItems="center"
      justifyContent="center"
      p={belowSM ? 2 : 5}
    >
      <Typography
        component={Box}
        variant="h4"
        // textAlign="justify"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Box pb={2}>
          <Typography variant="h1" fontWeight="600" lineHeight="1">
            There is a fierce battle underway for our place in the AI era.
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          // overflow="scroll"
        >
          <Box
            pb={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Box>
              AI has achieved amazing progress through being trained on our
              collective data and knowledge.
            </Box>
            <Box>
              But the lack of digital property rights in AI assets is resulting
              in dangerous monopolies.
            </Box>
          </Box>
          <Box
            pb={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Box>
              We are in danger of being excluded from the economic benefits of
              the AI future.
            </Box>
            <Box>
              Only through reclaiming our digital property rights, can we secure
              our participation rights in the economic benefits brought by AI.
            </Box>

            <Box py={4}></Box>
            <Box>
              Powered by KIP Protocol, KnowledgeFi.xyz is a full decentralised
              platform that unlocks{" "}
            </Box>
            <Box>
              {" "}
              true digital property rights of Knowledge Assets, and empowers
              monetisation through Web3.{" "}
            </Box>
          </Box>

          <Box pb={1} mt={1}>
            <Typography variant="h4" fontWeight="600">
              Your Knowledge is your Property. Take it back.
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" fontWeight="600">
              Welcome to KnowledgeFi.
            </Typography>
            <Box pb={2} mt={5} className="relative"></Box>
          </Box>
        </Box>
      </Typography>
    </Box>
  );
};
