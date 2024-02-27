const scale = 1000;

const defaultValues = {
  initialCameraPosition: [-5, Math.PI / 2, 0],
  initialCameraRotation: new THREE.Euler(0, -Math.PI / 2, 0, 'ZYX'),
};

let farMutiplier = 1.5; // 1
let initialY = Math.PI / 2; // 1.5
let page2PositionY = -50; // -25
let mainBgColor = '#166b64'; // darker: #0d4c47 lighter: #166b64   darker2: #0a3431

let controllerObj_general = {
  // scale: { value: 1000, min: 1, max: 10000, step: 1 },
  backgroundColor: mainBgColor,
  fogNear: {
    value: 1,
    min: 1,
    max: 15,
    step: 1,
  },
  fogFar: {
    value: 25 * farMutiplier, // 15
    min: 1,
    max: 50,
    step: 1,
  },
};

let controllerObj_title = {
  value: 'DIVE',
  position: {
    value: [0, initialY * 1.1, 0],
    step: 0.01,
  },
  rotation: {
    value: [0, -Math.PI / 2, 0],
    step: 0.01,
  },
  size: { value: 1.75, min: 0, max: 50, step: 0.01 },
};

let controllerObj_ocean = {
  flowSpeed: { value: 0.1, min: 0.01, max: 5, step: 0.01 },
  distortionScale: { value: 1.7, min: 0.01, max: 10, step: 0.01 },
  customColor: false,
  waterColor: {
    value: mainBgColor,
    render: (get) => get('Ocean.customColor'),
  },
};

let controllerObj_stars = {
  position: {
    value: [0, -Math.PI * 2, 2],
    step: 0.01,
  },
  color: '#ffffff',
  speed: { value: 4, min: 0.01, max: 5, step: 0.01 },
  size: { value: 0.01, min: 0.01, max: 1, step: 0.01 },
  radius: { value: 10, min: 0.1, max: 20, step: 0.1 },
};

let controllerObj_title2 = {
  backgroundColor: '#000000',
  value: '',
  text1: 'Text 1',
  text2: 'Text 2',
  text3: 'Text 3',
  position: {
    // value: [-Math.PI * 2, -0.5, -25],
    // value: [0, Math.PI, 0],
    value: [0, Math.PI / 3, 0],
    step: 0.1,
  },
  // rotation: {
  //   value: [0, -Math.PI / 2, 0],
  //   step: 0.01,
  // },
  size: { value: 4, min: 0, max: 50, step: 0.1 },
};

let controllerObj_terrain = {
  position: {
    value: [0, -10, 0],
    // value: [0, 0, 0],
    step: 0.1,
  },
  rotation: {
    value: [-Math.PI / 2, 0, 0],
    step: 0.1,
  },
  speed: { value: 0.02, min: 0.001, max: 5, step: 0.001 },
  xZoom: { value: 3, min: 0, max: 20, step: 1 },
  yZoom: { value: 3, min: 0, max: 20, step: 1 },
  noiseStrength: { value: 0.8, min: 0, max: 10, step: 0.01 },
};

let controllerObj_godray_general = {
  position: {
    value: [0, -0.1, -60],
    step: 0.1,
  },
  rotation: {
    value: [-Math.PI / 2, 0, 0],
    step: 0.01,
  },
  lookAt: {
    value: [7, 0, 0],
    step: 0.1,
  },
  size: {
    value: 1.6, // 1
    step: 0.1,
  },
  color: '#b4936f', // orange:b4936f  grey:b7b7b7
};

let controllerObj_godray_effect = {
  samples: { value: 300, min: 10, max: 1000, step: 10 },
  density: { value: 0.98, min: 0, max: 1, step: 0.01 },
  decay: { value: 0.98, min: 0, max: 1, step: 0.01 },
  weight: { value: 0.65, min: 0, max: 10, step: 0.01 },
  exposure: { value: 0.56, min: 0, max: 10, step: 0.01 }, // 0.56
  clampMax: { value: 1, min: 0, max: 1, step: 0.01 },
  blur: { value: 0, min: 0, max: 1, step: 0.1 },
  kernelSize: {
    // https://vanruesc.github.io/postprocessing/public/docs/file/src/materials/ConvolutionMaterial.js.html#lineNumber124
    options: {
      VERY_SMALL: 0,
      SMALL: 1,
      MEDIUM: 2,
      LARGE: 3,
      VERY_LARGE: 4,
      HUGE: 5,
    },
    value: 1,
  },
  blendFunction: {
    // https://vanruesc.github.io/postprocessing/public/docs/file/src/effects/blending/BlendFunction.js.html
    options: {
      SKIP: 0,
      ADD: 1,
      ALPHA: 2,
      AVERAGE: 3,
      COLOR_BURN: 4,
      COLOR_DODGE: 5,
      DARKEN: 6,
      DIFFERENCE: 7,
      EXCLUSION: 8,
      LIGHTEN: 9,
      MULTIPLY: 10,
      DIVIDE: 11,
      NEGATION: 12,
      NORMAL: 13,
      OVERLAY: 14,
      REFLECT: 15,
      SCREEN: 16,
      SOFT_LIGHT: 17,
      SUBTRACT: 18,
    },
    value: 16,
  },
};
