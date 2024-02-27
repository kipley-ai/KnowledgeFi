import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

const breakpointKeys: Record<string, string> = {
  xs: "belowXS",
  sm: "belowSM",
  md: "belowMD",
  lg: "belowLG",
  xl: "belowXL",
};

const useBreakpoints = (defaultBreakpoint: Breakpoint) => {
  const theme = useTheme();
  const belowXS = useMediaQuery(theme.breakpoints.down("xs"));
  const belowSM = useMediaQuery(theme.breakpoints.down("sm"));
  const belowMD = useMediaQuery(theme.breakpoints.down("md"));
  const belowLG = useMediaQuery(theme.breakpoints.down("lg"));
  const belowXL = useMediaQuery(theme.breakpoints.down("xl"));

  let result: any = {
    belowXS,
    belowSM,
    belowMD,
    belowLG,
    belowXL,
    belowBreakpoint: belowMD,
    breakpoint: defaultBreakpoint,

    mediaQueryXS: theme.breakpoints.down("xs"),
    mediaQuerySM: theme.breakpoints.down("sm"),
    mediaQueryMD: theme.breakpoints.down("md"),
    mediaQueryLG: theme.breakpoints.down("lg"),
    mediaQueryXL: theme.breakpoints.down("xl"),
    mediaQueryBreakpoint: theme.breakpoints.down(defaultBreakpoint),
  };

  let defaultBreakpointKey = breakpointKeys?.[defaultBreakpoint];
  if (defaultBreakpointKey) {
    result["belowBreakpoint"] = result[defaultBreakpointKey];
    result["mediaQueryBreakpoint"] =
      result?.[`mediaQuery${defaultBreakpoint.toUpperCase()}`];
  }

  return result;
};

export default useBreakpoints;
