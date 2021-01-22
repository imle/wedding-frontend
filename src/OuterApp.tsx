import React from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import PublicApp from "./public/App";
import BackroomOuterApp from "./backroom/OuterApp";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthProvider} from "react-auth-kit";


export default function OuterApp() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: (prefersDarkMode && true) ? "dark" : "light",
        },
        typography: {
          fontFamily: `"Handlee"`,
        },
      }),
    [prefersDarkMode],
  );

  return (
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
  );
}
