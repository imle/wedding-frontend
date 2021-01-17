import React from "react";
import {Route, RouteComponentProps} from "react-router-dom";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Logout from "./Logout";
import {withAuthUser} from "react-auth-kit";
import {BackroomUser} from "../types/backroom-user";

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

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  authState: BackroomUser;
}

interface State {
}

class App extends React.Component<Props, State> {
  state: State = {
  };

  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Route path="/" component={Logout}/>
        {this.props.authState?.username}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, {withTheme: true})(withAuthUser(App));
