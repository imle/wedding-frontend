import React from "react";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import BottomNavigation from "@material-ui/core/BottomNavigation";

import Countdown from "./Countdown";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import Home from "./Home";
import Gallery from "./Gallery";
import {galleryImages, ImageTile} from "./data";
import RSVPByCode from "./RSVPByCode";
import RSVPSearch from "./RSVPSearch";
import Hotels from "./Hotels";

const styles = (theme: Theme) => createStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    flexGrow: 1,
    // overflow: "auto",
  },
  header: {},
  footer: {},
  title: {
    marginTop: theme.spacing(3),
    // fontFamily: `cursive`,
    fontFamily: `"Mrs Saint Delafield", cursive`,
    // fontFamily: `"Alex Brush", cursive`,
    // fontFamily: `"Shadows Into Light Two", cursive`,
    // fontFamily: `"Reenie Beanie", cursive`,
    // fontFamily: `"Arizonia", cursive`,
    userSelect: "none",
    [theme.breakpoints.up("sm")]: {
      fontSize: "7.6em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "12vw",
    },
  },
  title_space: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  mobile_nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
}

interface State {
  date_of_wedding: Date;
  images: ImageTile[];
  page: string;
}

class App extends React.Component<Props, State> {
  state: State = {
    date_of_wedding: new Date(2022, 4, 28, 18, 0),
    images: galleryImages,
    page: ((): string => {
      const pathParts = this.props.history.location.pathname.substr(1).split("/");
      if (pathParts[0].length > 0) {
        return pathParts[0];
      } else {
        return "home";
      }
    })(),
  };

  setPage = (value: string) => {
    this.setState({
      page: value,
    })
  };

  setRsvpCode = (code: string) => {
    this.props.history.push(`/rsvp/${code}`);
  };

  render() {
    const {classes} = this.props;

    return (
      <Box className={classes.root} maxWidth={"xl"}>
        <Box className={classes.header}>
          <Grid item xs={12}>
            <Hidden smDown>
              <Grid container alignItems={"center"} className={classes.title_space}>
                <Grid item xs={9}>
                  <Typography className={classes.title} variant="h1" component="h2">
                    Steven&nbsp;&nbsp;&&nbsp;&nbsp;Savannah
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant={"h6"} align={"right"}>
                    <span>The Estate<br/></span>
                    <span>Atlanta, GA 30305<br/></span>
                    <Countdown day={this.state.date_of_wedding}/>
                  </Typography>
                </Grid>
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Typography className={classes.title} variant="h1" component="h2" align={"center"}>
                Steven&nbsp;&nbsp;&&nbsp;&nbsp;Savannah
              </Typography>
            </Hidden>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={12}>
              <DesktopNav page={this.state.page} setPage={this.setPage}/>
            </Grid>
          </Hidden>
        </Box>
        <Box className={classes.content}>
          <Switch>
            <Route path="/hotels" exact>
              <Hotels date_of_wedding={this.state.date_of_wedding}/>
            </Route>
            <Route path="/gallery" exact>
              <Gallery images={this.state.images}/>
            </Route>
            <Route path="/registry" exact>
              {/*<Registry />*/}
            </Route>
            <Route path="/rsvp/:rsvp_code" exact render={(match: RouteComponentProps<{ rsvp_code: string }>) => (
              <RSVPByCode code={match.match.params.rsvp_code}/>
            )}/>
            <Route path="/rsvp" exact>
              <RSVPSearch setRsvpCode={this.setRsvpCode}/>
            </Route>
            <Route path="/" exact>
              <Home date_of_wedding={this.state.date_of_wedding}/>
            </Route>
            <Route path="*">
              <Redirect to={{pathname: "/"}}/>
            </Route>
          </Switch>
        </Box>
        <Box className={classes.footer}>
          <Hidden smUp>
            <Box>
              <BottomNavigation/>
            </Box>
            <Box className={classes.mobile_nav}>
              <MobileNav page={this.state.page} setPage={this.setPage}/>
            </Box>
          </Hidden>
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles, {withTheme: true})(App);
