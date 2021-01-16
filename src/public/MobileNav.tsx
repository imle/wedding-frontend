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

const styles = (theme: Theme) => createStyles({});

interface Props extends WithStyles<typeof styles> {
  page: string;
  setPage: (value: string) => void;
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
        <BottomNavigationAction value={"home"} label="Home" icon={<HomeIcon/>} component={RouterLink} to={"/"}/>
        <BottomNavigationAction value={"hotels"} label="Hotels" icon={<HotelIcon/>} component={RouterLink} to={"/hotels"}/>
        <BottomNavigationAction value={"gallery"} label="Gallery" icon={<ImagesIcon/>} component={RouterLink} to={"/gallery"}/>
        <BottomNavigationAction value={"registry"} label="Registry" icon={<RegistryIcon/>} component={RouterLink} to={"/registry"}/>
        <BottomNavigationAction value={"rsvp"} label="RSVP" icon={<RSVPIcon/>} component={RouterLink} to={"/rsvp"}/>
      </BottomNavigation>
    );
  }
}

export default withStyles(styles, {withTheme: true})(MobileNav);
