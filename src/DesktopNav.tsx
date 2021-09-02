import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from "@material-ui/core/Link";

const styles = (theme: Theme) => createStyles({
  tab: {
    minWidth: 0,
    [theme.breakpoints.up("lg")]: {
      padding: "0 40px",
    },
    [theme.breakpoints.down("lg")]: {
      padding: "0 15px",
    },
    [theme.breakpoints.down(760)]: {
      padding: "0 8px",
    },
    [theme.breakpoints.down(630)]: {
      padding: "0 6px",
    },
  },
});

interface Props extends WithStyles<typeof styles> {
  page: string;

  setPage(value: string): void;
}

interface State {
}

class DesktopNav extends React.Component<Props, State> {
  render() {
    const {classes} = this.props;

    return (
      <Paper square>
        <Tabs
          value={this.props.page}
          onChange={(event, value) => this.props.setPage(value)}
          centered
        >
          <Tab className={classes.tab} label="Home" value={"home"} component={RouterLink} to={"/"}/>
          <Tab className={classes.tab} label="Schedule" value={"schedule"} component={RouterLink} to={"/schedule"}/>
          <Tab className={classes.tab} label="Wedding Party" value={"wedding-party"} component={RouterLink} to={"/wedding-party"}/>
          <Tab className={classes.tab} label="Travel" value={"travel"} component={RouterLink} to={"/travel"}/>
          <Tab className={classes.tab} label="Gallery" value={"gallery"} component={RouterLink} to={"/gallery"}/>
          <Tab className={classes.tab} label="Registry" value={"registry"} component={RouterLink} to={"/registry"}/>
          <Tab className={classes.tab} label="FAQ" value={"faq"} component={RouterLink} to={"/faq"}/>
          <Tab className={classes.tab} label="RSVP" value={"rsvp"} component={RouterLink} to={"/rsvp"}/>
          {/*<Tab className={classes.tab} label="RSVP" value={"rsvp"} component={Link} href={"https://steven-savannah.wedsites.com/rsvp"}/>*/}
        </Tabs>
      </Paper>
    );
  }
}

export default withStyles(styles, {withTheme: true})(DesktopNav);
