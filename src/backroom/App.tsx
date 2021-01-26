import React from "react";
import clsx from "clsx";
import {Link as RouterLink, Redirect, Route, Switch} from "react-router-dom";
import {withSignOut} from "react-auth-kit";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Box from "@material-ui/core/Box";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import Dashboard from "./Deashboard";
import GuestList from "./GuestList";
import {APIHost} from "../data/api";
import {ErrorResponse} from "../types/responses";

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    height: "100%",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

interface Props extends WithStyles<typeof styles> {
  signOut(): boolean;
}

interface State {
  open: boolean;
}

class App extends React.Component<Props, State> {
  state: State = {
    open: true,
  };

  componentDidMount() {
    console.log("maybe");
  }

  handleDrawerOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false,
    });
  };

  private logout = () => {
    fetch(`//${APIHost}/api/logout`)
      .then((response) => {
        if (response.status !== 200) throw response.status;
      })
      .catch((reason: number | ErrorResponse) => {
        let err: string;
        if (typeof reason === "number") {
          switch (reason) {
            default:
              err = "Unknown error occurred."
          }
        } else {
          err = reason.error;
        }

        console.error(err);
      });

    this.props.signOut();
  }

  render() {
    const {classes} = this.props;

    return (
      <Box className={classes.root}>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon/>
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Persistent drawer
            </Typography>
            <Button variant="contained" onClick={this.logout}>Sign Out</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon/>
            </IconButton>
          </div>
          <Divider/>
          <List>
            <ListItem button to={"/backroom"} component={RouterLink}>
              <ListItemIcon><DashboardIcon/></ListItemIcon>
              <ListItemText primary={"Dashboard"}/>
            </ListItem>
            <ListItem button to={"/backroom/guest-list"} component={RouterLink}>
              <ListItemIcon><PeopleIcon/></ListItemIcon>
              <ListItemText primary={"Guest List"}/>
            </ListItem>
          </List>
          <Divider/>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
          <Box display={"flex"} height={"100%"} flexDirection={"column"}>
            <div className={classes.drawerHeader}/>
            <Box flexGrow={1}>
              <Switch>
                <Route path="/backroom/guest-list" exact component={GuestList}/>
                <Route path="/backroom" exact component={Dashboard}/>
                <Route path="*">
                  <Redirect to={{pathname: "/"}}/>
                </Route>
              </Switch>
            </Box>
          </Box>
        </main>
      </Box>
    );
  }
}

export default withStyles(styles, {withTheme: true})(withSignOut(App));
