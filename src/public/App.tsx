import React from "react";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {ReactImageGalleryItem} from "react-image-gallery";
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
import {galleryImages} from "../data/gallery";
import RSVPByCode from "./RSVPByCode";
import RSVPSearch from "./RSVPSearch";
import Travel from "./Hotels";
import styled from "@emotion/styled";

const Root = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled(Box)`
  flex: 1;
`;

const Header = styled(Box)`
  flex: 0;
`;

const Footer = styled(Box)`
  flex: 0;
`;

const Title = styled(Typography)`
  font-family: "Mrs Saint Delafield", cursive;
  user-select: none;
`;

const TitleLarge = styled(Title)`
  font-size: 7em;
`;

const TitleSmall = styled(Title)`
  font-size: 12vw;
`;

const MobileNavContainer = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const styles = (theme: Theme) => createStyles({
  title_space: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
}

interface State {
  date_of_wedding: Date;
  images: ReactImageGalleryItem[];
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
      <Root maxWidth={"xl"}>
        <Header>
          <Grid item xs={12}>
            <Hidden mdDown>
              <Grid className={classes.title_space} container alignItems={"center"}>
                <Grid item xs={9} marginTop={3}>
                  <TitleLarge variant="h2">
                    Steven&nbsp;&nbsp;&&nbsp;&nbsp;Savannah
                  </TitleLarge>
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
              <Box marginTop={3}>
                <TitleSmall variant="h2" align={"center"}>
                  Steven&nbsp;&nbsp;&&nbsp;&nbsp;Savannah
                </TitleSmall>
              </Box>
            </Hidden>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={12}>
              <DesktopNav page={this.state.page} setPage={this.setPage}/>
            </Grid>
          </Hidden>
        </Header>
        <Content>
          <Switch>
            <Route path="/travel" exact>
              <Travel date_of_wedding={this.state.date_of_wedding}/>
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
        </Content>
        <Footer>
          <Hidden smUp>
            <Box>
              <BottomNavigation/>
            </Box>
            <MobileNavContainer>
              <MobileNav page={this.state.page} setPage={this.setPage}/>
            </MobileNavContainer>
          </Hidden>
        </Footer>
      </Root>
    );
  }
}

export default withStyles(styles, {withTheme: true})(App);
