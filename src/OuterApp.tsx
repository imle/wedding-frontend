import React from "react";
import {AuthProvider} from "react-auth-kit";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createMuiTheme} from "@material-ui/core/styles";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {ThemeProvider} from "@emotion/react";
import {useMediaQuery} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import blue from "@material-ui/core/colors/blue";
import PublicApp from "./public/App";
import BackroomOuterApp from "./backroom/OuterApp";


export default function OuterApp() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          // mode: (prefersDarkMode) ? "dark" : "light",
          primary: {
            main: blue["700"], //|| (prefersDarkMode) ? blue["200"] : blue["700"],
          },
        },
        typography: {
          fontFamily: `"Handlee"`,
        },
      }),
    [prefersDarkMode],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AuthProvider
          authStorageType="localstorage"
          authStorageName="_auth_t"
          authTimeStorageName="_auth_time"
          stateStorageName="_auth_state"
          refreshTokenName="_refresh_t"
        >
          <Router>
            <Switch>
              <Route path="/backroom" component={BackroomOuterApp}/>
              <Route component={PublicApp}/>
            </Switch>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
