import React from "react";
import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import {useMediaQuery} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./public/App";
import BackroomApp from "./backroom/App";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


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
      <Router>
        <Switch>
          <Route path="/backroom" component={BackroomApp} />
          <Route component={App} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
