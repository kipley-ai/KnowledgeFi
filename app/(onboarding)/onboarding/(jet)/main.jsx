import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { Leva } from "leva";

import App from "./App";
import { showController } from "./Constants";

import "./index.css";

const fontSizes = {
  h1: 2,
  h2: 1.5,
  h3: 1.17,
  h4: 1,
  h5: 0.83,
  h6: 0.67,
};

const getFontSize = (value, unit = "rem") => {
  return `${value}${unit}`;
};

let theme = createTheme({
  typography: {
    fontFamily: [
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      // 'Roboto',
      // '"Helvetica Neue"',
      // 'Arial',
      // 'sans-serif',
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
      "Jura",
    ].join(","),
    h1: {
      fontSize: getFontSize(fontSizes.h1),
    },
    h2: {
      fontSize: getFontSize(fontSizes.h2),
    },
    h3: {
      fontSize: getFontSize(fontSizes.h3),
    },
    h4: {
      fontSize: getFontSize(fontSizes.h4),
    },
    h5: {
      fontSize: getFontSize(fontSizes.h5),
    },
    h6: {
      fontSize: getFontSize(fontSizes.h6),
    },
  },
});

theme.typography.h1 = {
  fontSize: getFontSize(fontSizes.h1),
  [theme.breakpoints.down("sm")]: {
    fontSize: getFontSize(fontSizes.h2),
    lineHeight: "1.2rem",
  },
};
theme.typography.h2 = {
  fontSize: getFontSize(fontSizes.h2),
  [theme.breakpoints.down("sm")]: {
    fontSize: getFontSize(fontSizes.h3),
  },
};
theme.typography.h3 = {
  fontSize: getFontSize(fontSizes.h3),
  [theme.breakpoints.down("sm")]: {
    fontSize: getFontSize(fontSizes.h4),
  },
};
theme.typography.h4 = {
  fontSize: getFontSize(fontSizes.h4),
  [theme.breakpoints.down("sm")]: {
    fontSize: getFontSize(fontSizes.h5),
    lineHeight: "1rem",
  },
};

const JetWelcome = () => {
  return (
    <ThemeProvider theme={theme}>
      <App />
      <Leva
        // theme={myTheme} // you can pass a custom theme (see the styling section)
        // fill // default = false,  true makes the pane fill the parent dom node it's rendered in
        // flat // default = false,  true removes border radius and shadow
        // oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
        // hideTitleBar // default = false, hides the GUI header
        collapsed // default = false, when true the GUI is collpased
        hidden={!showController} // default = false, when true the GUI is hidden
      />
    </ThemeProvider>
  );
};

export default JetWelcome;
