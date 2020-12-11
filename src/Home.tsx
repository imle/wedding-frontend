import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Image} from "@crystallize/react-image";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Countdown from "./Countdown";

import hero_small from "./photos/hero-small.jpg";
import hero_large from "./photos/hero-large.jpg";
import hero_original from "./photos/hero-original.jpg";
import venue_original from "./photos/venue-original.jpg";

const styles = (theme: Theme) => createStyles({
  root: {
    padding: 0,
  },
  card_grid: {
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(4),
    },
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
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
});

interface Props extends WithStyles<typeof styles> {
  date_of_wedding: Date;
}

interface State {
}

class Home extends React.Component<Props, State> {
  state: State = {};

  render() {
    const {classes} = this.props;

    return (
      <Container className={classes.root} maxWidth="xl">
        <Grid container>
          <Grid item sm={12} style={{maxHeight: "60vh", overflow: "hidden"}}>
            <Image
              style={{
                maxWidth: "100%",
                height: "auto",
                width: "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              url={hero_large}
              variants={[
                {url: hero_small, width: 427, height: 640},
                {url: hero_large, width: 1920, height: 1281},
                {url: hero_original, width: 6016, height: 4016},
              ]}
              altText={"hero"}
            />
          </Grid>
          <Hidden mdUp>
            <Grid item xs={12}>
              <Box mt={2} mb={2}>
                <Typography variant={"h6"} align={"center"}>
                  <span>A Place Name<br/></span>
                  <span>Somewhere, GA 30312<br/></span>
                  <Countdown day={this.props.date_of_wedding}/>
                </Typography>
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={12}>
            <Container className={classes.card_grid} maxWidth="xl">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.card_media}
                      image={venue_original}
                      title="Venue"
                    />
                    <CardContent className={classes.card_content}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Where
                      </Typography>
                      <Typography variant={"body1"}>
                        Our wedding will be head at the Grand Ultra Mega Super Hotel in downtown Hotlanta.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.card_media}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.card_content}>
                      <Typography gutterBottom variant="h5" component="h2">
                        When
                      </Typography>
                      <Typography>
                        Saturday, April 17, 2021<br/>
                        4:00 PM
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Home);
