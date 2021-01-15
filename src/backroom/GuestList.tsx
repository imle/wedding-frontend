import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Invitee} from "../types/invitee";
const styles = (theme: Theme) => createStyles({
  root: {}
});

interface Props extends WithStyles<typeof styles> {
  error?: string;
  invitee?: Invitee | null;
  matches?: Invitee[] | null;
  code?: string;
  searchForInviteeCode: (full_name: string, callback?: () => void) => void;
}

interface State {
  searching: boolean;
  full_name: string;
}

class Rsvp extends React.Component<Props, State> {
  state: State = {
    searching: false,
    full_name: "",
  };

  submit = (e: React.FormEvent) => {
    e.preventDefault();

    this.setState({
      searching: true,
    });

    this.props.searchForInviteeCode(this.state.full_name, () => this.setState({
      searching: false,
    }));
  };

  render() {
    const {classes} = this.props;

    return (
      <Container className={classes.root} maxWidth="md">

      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Rsvp);
