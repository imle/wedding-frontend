import React from "react";
import styled from "@emotion/styled";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router-dom";
import {differenceInCalendarDays, format} from "date-fns";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import Home from "./Home";
import Gallery from "./Gallery";
import {galleryImages, ImageListItemData} from "./data/gallery";
import RSVPByCode from "./RSVP/ByCode";
import RSVPSearch from "./RSVP/Search";
import RSVPFinished from "./RSVP/Finished";
import Travel from "./Hotels";
import Schedule from "./Schedule";

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
  z-index: 10000;
  background-color: ${props => props.theme.palette.grey[100]};
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

const TitleSpaceGrid = styled(Grid)`
  padding-left: ${props => props.theme.spacing(3)};
  padding-right: ${props => props.theme.spacing(3)};
`;

interface Props extends RouteComponentProps {
}

interface State {
  date_of_wedding: Date;
  images: ImageListItemData[];
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
                <Grid item xs={9} marginTop={3}>
                  <TitleLarge variant="h2">
                    Steven&nbsp;&nbsp;&&nbsp;&nbsp;Savannah
                  </TitleLarge>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant={"h6"} align={"right"}>
                    <span>#ImleBeeYours<br/></span>
                    {/*<span>#imlebeeyours<br/></span>*/}
                    <span>{format(this.state.date_of_wedding, "MMMM dd, yyyy")}<br/></span>
                    <span>{differenceInCalendarDays(this.state.date_of_wedding.getTime(), (new Date()).getTime())} days to go!</span>
                  </Typography>
                </Grid>
              </TitleSpaceGrid>
            </Hidden>
            <Hidden mdUp>
              <Box marginTop={3}>
                <TitleSmall variant="h2" align={"center"}>
                  Steven&nbsp;&nbsp;&&nbsp;&nbsp;Savannah
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
              <Gallery images={this.state.images}/>
            </Route>
            <Route path="/schedule" exact>
              <Schedule />
            </Route>
            <Route path="/wedding-party" exact>
              {/*<WeddingParty />*/}
            </Route>
            <Route path="/faq" exact>
              {/*<FAQ />*/}
            </Route>
            <Route path="/registry" exact>
              {/*<Registry />*/}
            </Route>
            <Route path="/rsvp/finished" exact>
              <RSVPFinished date_of_wedding={this.state.date_of_wedding}/>
            </Route>
            <Route path="/rsvp/:rsvp_code" exact render={(match: RouteComponentProps<{ rsvp_code: string }>) => (
              <RSVPByCode code={match.match.params.rsvp_code} finish={this.finishRsvp}/>
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

export default App;