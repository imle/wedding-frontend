import React from "react";
import styled from "@emotion/styled";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {differenceInCalendarDays, format} from "date-fns";
import BottomNavigation from "@mui/material/BottomNavigation";
import Typography from "@mui/material/Typography";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import Home from "./Home";
import Gallery from "./Gallery/Gallery";
import RSVPHoldOn from "./RSVP/HoldOn";
import Travel from "./Travel";
import Registry from "./Registry";
import Schedule from "./Schedule/Schedule";
import FAQ from "./FAQ/FAQ";

const Root = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled(Box)`
  flex: 1;
`;

const Header = styled.header`
  flex: 0;
  z-index: 1; // ensure the hero image does not cover up the box-shadow of the app-bar
  background-color: ${props => props.theme.palette.grey[100]};
`;

const Footer = styled(Box)`
  flex: 0;
`;

const Title = styled(Typography)`
  font-family: "Allura", cursive;
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

const TitleSpaceGrid = styled(Grid)`
  padding-left: ${props => props.theme.spacing(3)};
  padding-right: ${props => props.theme.spacing(3)};
`;

interface Props extends RouteComponentProps {
}

interface State {
  date_of_wedding: Date;
  page: string;
}

class App extends React.Component<Props, State> {
  state: State = {
    date_of_wedding: new Date(2022, 4, 28, 17, 0),
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
    window.scrollTo(0, 0);

    this.setState({
      ...this.state,
      page: value,
    })
  };

  setRsvpCode = (code: string) => {
    this.props.history.push(`/rsvp/${code}`);
  };

  finishRsvp = () => {
    this.props.history.push("/rsvp/finished");
  };

  render() {
    return (
      <Root>
        <Header>
          <Grid item xs={12}>
            <Hidden mdDown>
              <TitleSpaceGrid id={"test"} container alignItems={"center"}>
                <Grid item xs={9} marginTop={1}>
                  <TitleLarge variant="h2">
                    Steven&nbsp;&&nbsp;Savannah
                  </TitleLarge>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant={"h6"} align={"right"}>
                    <span>#ImleBeeYours<br/></span>
                    <span>{format(this.state.date_of_wedding, "MMMM dd, yyyy")}<br/></span>
                    <span>{differenceInCalendarDays(this.state.date_of_wedding.getTime(), (new Date()).getTime())} days to go!</span>
                  </Typography>
                </Grid>
              </TitleSpaceGrid>
            </Hidden>
            <Hidden mdUp>
              <Box marginTop={1}>
                <TitleSmall variant="h2" align={"center"}>
                  Steven&nbsp;&&nbsp;Savannah
                </TitleSmall>
              </Box>
            </Hidden>
          </Grid>
          <Hidden smDown>
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
              <Gallery/>
            </Route>
            <Route path="/schedule" exact>
              <Schedule />
            </Route>
            <Route path="/wedding-party" exact>
              {/*<WeddingParty />*/}
            </Route>
            <Route path="/faq" exact>
              <FAQ date_of_wedding={this.state.date_of_wedding}/>
            </Route>
            <Route path="/registry" exact>
              <Registry />
            </Route>
            <Route path="/rsvp" exact>
              <RSVPHoldOn />
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

export default App;
