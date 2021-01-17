import React from "react";
import {withSignOut} from "react-auth-kit";
import {RouteComponentProps} from "react-router-dom";
import Button from "@material-ui/core/Button";

interface Props extends RouteComponentProps {
  signOut(): boolean;
}

interface State {
}

class Logout extends React.Component<Props, State> {
  render() {
    return (
      <Button onClick={() => this.props.signOut()}>Sign Out</Button>
    )
  }
}

export default withSignOut(Logout);
