import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import {Image} from "@crystallize/react-image";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Accommodation, accommodations} from "./data/hotels";
import {CardActions, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Link from "@material-ui/core/Link";
import CardMedia from "@material-ui/core/CardMedia";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const styles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(4),
  },
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
      <Container className={classes.root} maxWidth="lg">
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
                    <span>{accommodation.address}</span>
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
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Travel);