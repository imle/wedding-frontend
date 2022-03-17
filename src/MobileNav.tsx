import React from "react";
import {Link as RouterLink} from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Slide from '@mui/material/Slide';
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import HomeIcon from "@mui/icons-material/HomeRounded";
import HotelIcon from "@mui/icons-material/HotelRounded";
import ImagesIcon from "@mui/icons-material/Photo";
import MoreIcon from "@mui/icons-material/Menu";
import RSVPIcon from "@mui/icons-material/Mail";
import ScheduleIcon from "@mui/icons-material/Schedule";
import GroupsIcon from "@mui/icons-material/Groups";
import AppsIcon from "@mui/icons-material/Apps";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
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
            href={"https://steven-savannah.wedsites.com/rsvp"}
            label="RSVP"
            value="rsvp"
            icon={<RSVPIcon/>}
            component={Link}
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
            <ListItem button href={"https://steven-savannah.wedsites.com/rsvp"} component={Link} onClick={this.handleCloseSelected("rsvp")}>
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
