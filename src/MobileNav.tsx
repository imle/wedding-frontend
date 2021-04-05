import React from "react";
import {Link as RouterLink} from "react-router-dom";
import { TransitionProps } from "@material-ui/core/transitions";
import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Slide from '@material-ui/core/Slide';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import HomeIcon from "@material-ui/icons/HomeRounded";
import HotelIcon from "@material-ui/icons/HotelRounded";
import ImagesIcon from "@material-ui/icons/Photo";
import MoreIcon from "@material-ui/icons/Menu";
import RSVPIcon from "@material-ui/icons/Mail";
import ScheduleIcon from "@material-ui/icons/Schedule";
import GroupsIcon from "@material-ui/icons/Groups";
import AppsIcon from "@material-ui/icons/Apps";
import HelpIcon from "@material-ui/icons/Help";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children?: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  page: string;

  setPage(value: string): void;
}

interface State {
  menuOpen: boolean;
}

class MobileNav extends React.Component<Props, State> {
  state: State = {
    menuOpen: false,
  };

  handleClickOpen = () => {
    this.setState({menuOpen: true});
  };

  handleClose = () => {
    this.setState({menuOpen: false});
  };

  handleCloseSelected = (value: string) => {
    return () => {
      this.props.setPage(value);
      this.setState({menuOpen: false});
    };
  };

  render() {
    console.log(this.props.page);
    return (
      <>
        <BottomNavigation
          value={this.props.page}
          onChange={(event, value) => this.props.setPage(value)}
          showLabels
        >
          <BottomNavigationAction
            sx={{minWidth: 40}}
            to={"/"}
            label="Home"
            value="home"
            icon={<HomeIcon/>}
            component={RouterLink}
          />
          <BottomNavigationAction
            sx={{minWidth: 40}}
            to={"/travel"}
            label="Travel"
            value="travel"
            icon={<HotelIcon/>}
            component={RouterLink}
          />
          <BottomNavigationAction
            sx={{minWidth: 40}}
            to={"/gallery"}
            label="Gallery"
            value="gallery"
            icon={<ImagesIcon/>}
            component={RouterLink}
          />
          <BottomNavigationAction
            sx={{minWidth: 40}}
            to={"/rsvp"}
            label="RSVP"
            value="rsvp"
            icon={<RSVPIcon/>}
            component={RouterLink}
          />
          <BottomNavigationAction
            sx={{minWidth: 40}}
            label="More"
            value={null}
            icon={<MoreIcon/>}
            onClick={this.handleClickOpen}
          />
        </BottomNavigation>
        <Dialog
          fullScreen
          open={this.state.menuOpen}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar position="relative">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" sx={{ml: 2}} component="div">
                Menu
              </Typography>
            </Toolbar>
          </AppBar>
          <List sx={{p: 0}}>
            <ListItem button to={"/"} component={RouterLink} onClick={this.handleCloseSelected("home")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home"/>
            </ListItem>
            <Divider/>
            <ListItem button to={"/schedule"} component={RouterLink} onClick={this.handleCloseSelected("schedule")}>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText primary="Schedule"/>
            </ListItem>
            <Divider/>
            <ListItem button to={"/wedding-party"} component={RouterLink} onClick={this.handleCloseSelected("wedding-party")}>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Wedding Party"/>
            </ListItem>
            <Divider/>
            <ListItem button to={"/travel"} component={RouterLink} onClick={this.handleCloseSelected("travel")}>
              <ListItemIcon>
                <HotelIcon />
              </ListItemIcon>
              <ListItemText primary="Travel"/>
            </ListItem>
            <Divider/>
            <ListItem button to={"/gallery"} component={RouterLink} onClick={this.handleCloseSelected("gallery")}>
              <ListItemIcon>
                <ImagesIcon />
              </ListItemIcon>
              <ListItemText primary="Gallery"/>
            </ListItem>
            <Divider/>
            <ListItem button to={"/registry"} component={RouterLink} onClick={this.handleCloseSelected("registry")}>
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Registry"/>
            </ListItem>
            <Divider/>
            <ListItem button to={"/faq"} component={RouterLink} onClick={this.handleCloseSelected("faq")}>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="FAQ"/>
            </ListItem>
            <Divider/>
            <ListItem button to={"/rsvp"} component={RouterLink} onClick={this.handleCloseSelected("rsvp")}>
              <ListItemIcon>
                <RSVPIcon />
              </ListItemIcon>
              <ListItemText primary="RSVP"/>
            </ListItem>
            <Divider/>
          </List>
        </Dialog>
      </>
    );
  }
}

export default MobileNav;
