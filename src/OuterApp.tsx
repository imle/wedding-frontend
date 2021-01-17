import React from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./public/App";
import BackroomApp from "./backroom/App";
import BackroomLogin from "./backroom/Login";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {AuthProvider, PrivateRoute} from "react-auth-kit";


export default function OuterApp() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: (prefersDarkMode && false) ? "dark" : "light",
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
        authStorageType={"cookie"}
        authStorageName={"_auth_t"}
        authTimeStorageName={"_auth_time"}
        stateStorageName={"_auth_state"}
        cookieDomain={window.location.hostname}
        cookieSecure={window.location.protocol === "https:"}
        refreshTokenName={"_refresh_t"}
      >
        <Router>
          <Switch>
            <Route path="/backroom/login" component={BackroomLogin}/>
            <PrivateRoute path="/backroom" loginPath="/backroom/login" component={BackroomApp}/>
            <Route component={App}/>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
