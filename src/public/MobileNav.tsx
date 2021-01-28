import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/HomeRounded";
import HotelIcon from "@material-ui/icons/HotelRounded";
import ImagesIcon from "@material-ui/icons/Photo";
import RegistryIcon from "@material-ui/icons/ListRounded";
import RSVPIcon from "@material-ui/icons/Mail";

const styles = (theme: Theme) => createStyles({
  action: {
    minWidth: "40px",
  }
});

interface Props extends WithStyles<typeof styles> {
  page: string;
  setPage(value: string): void;
}

interface State {
}

class MobileNav extends React.Component<Props, State> {
  state: State = {};

  render() {
    const {classes} = this.props;

    return (
      <BottomNavigation
        value={this.props.page}
        onChange={(event, value) => this.props.setPage(value)}
        showLabels
      >
        <BottomNavigationAction
          className={classes.action}
          to={"/"}
          label="Home"
          value="home"
          icon={<HomeIcon/>}
          component={RouterLink}
        />
        <BottomNavigationAction
          className={classes.action}
          to={"/travel"}
          label="Travel"
          value="travel"
          icon={<HotelIcon/>}
          component={RouterLink}
        />
        <BottomNavigationAction
          className={classes.action}
          to={"/gallery"}
          label="Gallery"
          value="gallery"
          icon={<ImagesIcon/>}
          component={RouterLink}
        />
        <BottomNavigationAction
          className={classes.action}
          to={"/registry"}
          label="Registry"
          value="registry"
          icon={<RegistryIcon/>}
          component={RouterLink}
        />
        <BottomNavigationAction
          className={classes.action}
          to={"/rsvp"}
          label="RSVP"
          value="rsvp"
          icon={<RSVPIcon/>}
          component={RouterLink}
        />
      </BottomNavigation>
    );
  }
}

export default withStyles(styles, {withTheme: true})(MobileNav);
