import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import GuestListTable from "./GuestList/Container";

const styles = (theme: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
}

interface State {
}

class GuestList extends React.Component<Props, State> {
  state: State = {};

  render() {
    const {classes} = this.props;

    return (
      <GuestListTable/>
    );
  }
}

export default withStyles(styles, {withTheme: true})(GuestList);
