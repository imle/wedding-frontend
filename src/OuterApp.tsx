import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {ThemeProvider} from "@emotion/react";
// import {useMediaQuery} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import blue from "@mui/material/colors/blue";
import PublicApp from "./App";


export default function OuterApp() {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const additionalLineHeight = 0.05;

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          // mode: (prefersDarkMode) ? "dark" : "light",
          primary: {
            main: blue["700"], //|| (prefersDarkMode) ? blue["200"] : blue["700"],
          },
        },
        typography: {
          fontFamily: `"Handlee"`,
          h1: { lineHeight: 1.167 + additionalLineHeight },
          h2: { lineHeight: 1.2 + additionalLineHeight },
          h3: { lineHeight: 1.167 + additionalLineHeight },
          h4: { lineHeight: 1.235 + additionalLineHeight },
          h5: { lineHeight: 1.334 + additionalLineHeight },
          h6: { lineHeight: 1.6 + additionalLineHeight },
          subtitle1: { lineHeight: 1.75 + additionalLineHeight },
          subtitle2: { lineHeight: 1.57 + additionalLineHeight },
          body1: { lineHeight: 1.5 + additionalLineHeight },
          body2: { lineHeight: 1.43 + additionalLineHeight },
          button: { lineHeight: 1.75 + additionalLineHeight },
          caption: { lineHeight: 1.66 + additionalLineHeight },
          overline: { lineHeight: 2.66 + additionalLineHeight },
        },
      }),
    [],
    // [prefersDarkMode],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Switch>
            <Route component={PublicApp}/>
          </Switch>
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
