import React from "react";
import {CardActions, Dialog, DialogActions, DialogContent, DialogContentText, Theme} from "@mui/material";
import {createStyles, WithStyles, withStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Accommodation, accommodations} from "./data/hotels";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Link from "@mui/material/Link";
import CardMedia from "@mui/material/CardMedia";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

const styles = (theme: Theme) => createStyles({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  card_media: {
    paddingTop: "56.25%", // 16:9
  },
  card_content: {
    flexGrow: 1,
  },
  hidden_on_desktop: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
});

const Root = styled(Container)`
  padding-top: ${props => props.theme.spacing(2)};
  padding-bottom: ${props => props.theme.spacing(4)};
`;

interface Props extends WithStyles<typeof styles> {
  date_of_wedding: Date;
}

interface State {
  selectedAccommodation?: Accommodation;
}

class Travel extends React.Component<Props, State> {
  state: State = {};

  handleClose = () => {
    this.setState({
      selectedAccommodation: undefined,
    });
  }

  render() {
    const {classes} = this.props;

    const linkToMartaMap = "https://www.google.com/maps/dir/Hartsfield-Jackson+Atlanta+International+Airport+(ATL),+6000+N+Terminal+Pkwy,+Atlanta,+GA+30320/Grand+Hyatt+Atlanta+In+Buckhead,+Peachtree+Road+Northeast,+Atlanta,+GA/@33.7506832,-84.4640083,12z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x88f4fd2fe1035901:0x4117a3ef1892b048!2m2!1d-84.4277001!2d33.6407282!1m5!1m1!1s0x88f505f5de81bd69:0xcc4d549151cab6e0!2m2!1d-84.3704039!2d33.8452408!3e3";
    return (
      <Root maxWidth="lg">
        <Box pb={2}>
          <Typography variant={"h4"}>Shuttle</Typography>
          <Divider orientation="horizontal"/>
        </Box>
        <Box pb={2}>
          <Typography>
            We will have transportation to and from the venue via a shuttle service.
            The shuttle will pick up at the Grand Hyatt Atlanta and drop guests off at the hotel as needed.
            If you are staying at the hotel, be sure to know when the shuttles are leaving so you make it to the
            ceremony on time!
            The bus will make its first trip 1 hour before the ceremony, its second and final trip will be 30 minutes
            before the ceremony.
          </Typography>
        </Box>
        <Box pb={2}>
          <Typography variant={"h4"}>Accommodations</Typography>
          <Divider orientation="horizontal"/>
        </Box>
        <Box pb={2}>
          <Typography>
            A block of rooms is reserved at the Grand Hyatt.
            The <Link href={linkToMartaMap} target={"_blank"}>Red Line MARTA train</Link> can
            take you almost directly to the hotel via Buckhead Station.
            If you prefer not to use public transit, ride sharing services are quite popular in Atlanta.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {accommodations.map((accommodation, i) => (
            <Grid key={accommodation.name} item xs={12} sm={i === 0 ? 12 : 6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.card_media}
                  image={accommodation.img_url}
                />
                <CardContent className={classes.card_content}>
                  <Typography gutterBottom variant="body1" component="h6">
                    {accommodation.name}
                  </Typography>
                  <Typography variant={"subtitle2"} align={"center"}>
                    {accommodation.address}
                  </Typography>
                </CardContent>
                <CardActions>
                  <ButtonGroup variant="text" fullWidth>
                    <Button component={Link} target="_blank" href={accommodation.booking_url}>Book</Button>
                    <Button
                      component={Link}
                      className={classes.hidden_on_desktop}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
                        if (!!accommodation.block_code) {
                          this.setState({selectedAccommodation: accommodation});
                          e.preventDefault();
                        }
                      }}
                      href={!accommodation.block_code ? `tel:${accommodation.phone_number}` : ""}
                    >
                      Call
                    </Button>
                    <Button component={Link} target="_blank" href={accommodation.google_map_link}>Map</Button>
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={!!this.state.selectedAccommodation}
          onClose={this.handleClose}
        >
          <DialogTitle>Wait!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Be sure to let the concierge know that you are booking for the Smith Imle wedding!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Never Mind</Button>
            <Button
              onClick={this.handleClose}
              href={this.state.selectedAccommodation ? `tel:${this.state.selectedAccommodation.phone_number}` : ""}
            >
              Call
            </Button>
          </DialogActions>
        </Dialog>
      </Root>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Travel);
