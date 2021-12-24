import React from "react";
import {CardActions, createStyles, Dialog, DialogActions, DialogContent, DialogContentText, Theme} from "@mui/material";
import {WithStyles, withStyles} from "@mui/styles";
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
import Hidden from "@mui/material/Hidden";
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
  ${props => props.theme.breakpoints.up("md")} {
    padding-top: ${props => props.theme.spacing(4)};
  }

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

    return (
      <Root maxWidth="lg">
        <Hidden mdUp>
          <Box p={1}>
            <Typography variant={"h4"}>Accommodations</Typography>
            <Divider orientation="horizontal"/>
          </Box>
        </Hidden>
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
                  {i === 0 ?
                    <Typography align={"center"}>
                      <br/>
                      Our official block is at this hotel.
                      <br/>
                      The Red Line MARTA train can take you almost directly to the hotel via Buckhead Station.
                      <br/>
                      If you prefer not to use public transit, ride sharing services are quite popular in Atlanta.
                    </Typography>
                    :
                    <></>
                  }
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
