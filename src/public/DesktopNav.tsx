import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Link as RouterLink} from "react-router-dom";

const styles = (theme: Theme) => createStyles({
  tab: {
    [theme.breakpoints.down("sm")]: {
      minWidth: 100,
    },
  },
});

interface Props extends WithStyles<typeof styles> {
  page: string;
  setPage(value: string):  void;
}

interface State {
}

class DesktopNav extends React.Component<Props, State> {
  render() {
    const { classes } = this.props;

    return (
      <Paper square>
        <Tabs
          value={this.props.page}
          onChange={(event, value) => this.props.setPage(value)}
          centered
        >
          <Tab className={classes.tab} label="Home" value={"home"} component={RouterLink} to={"/"}/>
          <Tab className={classes.tab} label="Travel" value={"travel"} component={RouterLink} to={"/travel"}/>
          <Tab className={classes.tab} label="Gallery" value={"gallery"} component={RouterLink} to={"/gallery"}/>
          <Tab className={classes.tab} label="Registry" value={"registry"} component={RouterLink} to={"/registry"}/>
          <Tab className={classes.tab} label="RSVP" value={"rsvp"} component={RouterLink} to={"/rsvp"}/>
        </Tabs>
      </Paper>
    );
  }
}

export default withStyles(styles, {withTheme: true})(DesktopNav);
