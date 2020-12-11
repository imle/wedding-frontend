import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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
import {tileData, TileDataItem} from "./data";

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100%",
  },
  container: {
    padding: 0,
    backgroundColor: theme.palette.background.default,
  },
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
  footer: {
    marginTop: "auto",
  },
});

interface Props extends WithStyles<typeof styles> {
}

interface State {
  date_of_wedding: Date;
  images: TileDataItem[];
  page: string;
}

class App extends React.Component<Props, State> {
  state: State = {
    date_of_wedding: new Date(2023, 11, 25),
    images: tileData,
    page: "home",
  };

  setPage = (value: string) => {
    this.setState({
      page: value,
    })
  };

  render() {
    const {classes} = this.props;

    return (
      <Box className={classes.root}>
        <Container className={classes.container} maxWidth="xl">
          <Grid container>
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
                      <span>A Place Name<br/></span>
                      <span>Somewhere, GA 30312<br/></span>
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
            <Grid item sm={12}>
              <Hidden xsDown>
                <DesktopNav page={this.state.page} setPage={this.setPage}/>
              </Hidden>
            </Grid>
            <Grid>
              <Switch>
                <Route path="/hotels">
                  {/*<Hotels />*/}
                </Route>
                <Route path="/gallery">
                  <Gallery images={this.state.images} />
                </Route>
                <Route path="/registry">
                  {/*<Registry />*/}
                </Route>
                <Route path="/rsvp">
                  {/*<Rsvp />*/}
                </Route>
                <Route path="/" exact>
                  <Home date_of_wedding={this.state.date_of_wedding}/>
                </Route>
                <Route path="*">
                  <Redirect to={{pathname: "/"}}/>
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </Container>
        <Hidden smUp>
          <Box className={classes.footer}>
            <BottomNavigation/>
          </Box>
          <Box className={classes.mobile_nav}>
            <MobileNav page={this.state.page} setPage={this.setPage}/>
          </Box>
        </Hidden>
      </Box>
    );
  }
}

export default withStyles(styles, {withTheme: true})(App);
