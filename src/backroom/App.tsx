import React from "react";
import {Route, RouteComponentProps} from "react-router-dom";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
  },
  container: {
    padding: 0,
    backgroundColor: theme.palette.background.default,
  },
  mobile_nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footer: {
    marginTop: "auto",
  },
});

interface RouteData {
}

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
}

interface State {
}

class App extends React.Component<Props, State> {
  state: State = {
  };

  render() {
    const {classes} = this.props;

    return (
      <Route
        path={["/rsvp/:rsvp_code", "*"]}
        render={(match: RouteComponentProps<RouteData>) => (
          <React.Fragment>
          </React.Fragment>
        )}/>
    );
  }
}

export default withStyles(styles, {withTheme: true})(App);
