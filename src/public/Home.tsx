import React from "react";
import {format} from "date-fns";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Image} from "@crystallize/react-image";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Countdown from "./Countdown";

import hero_small from "../photos/hero-small.jpg";
import hero_large from "../photos/hero-large.jpg";
import hero_original from "../photos/hero-original.jpg";

import venue_large from "../photos/the-estate.jpg";

const styles = (theme: Theme) => createStyles({
  root: {
    padding: 0,
  },
  hero: {
    [theme.breakpoints.up("lg")]: {
      maxHeight: "50vh",
    },
    [theme.breakpoints.up("lg")]: {
      maxHeight: "55vh",
    },
    maxHeight: "60vh",
    overflow: "hidden",
  },
  hero_image: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "-10vh",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "-5vh",
    },
  },
  card_grid: {
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
          <Grid className={classes.hero} item sm={12}>
            <Box className={classes.hero_image}>
              <Image
                style={{
                  display: "block",
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
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Container className={classes.card_grid} maxWidth="xl">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                  <Card className={classes.card}>
                    <Image
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        width: "auto",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                      url={venue_large}
                      variants={[
                        {url: venue_large, width: 960, height: 540},
                      ]}
                      altText={"venue"}
                    />
                    <CardContent className={classes.card_content}>
                      <Grid container>
                        <Grid item xs={6}>
                          <Typography gutterBottom variant="subtitle1">
                            Where
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant={"subtitle1"} align={"right"}>
                            The Estate<br/>
                            Atlanta, GA 30305<br/>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.card_media}
                      title="Image title"
                      image="https://source.unsplash.com/random"
                    />
                    <CardContent className={classes.card_content}>
                      <Grid container>
                        <Grid item xs={4}>
                          <Typography gutterBottom variant="subtitle1">
                            When
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography variant={"subtitle1"} align={"right"}>
                            {format(this.props.date_of_wedding, "iiii, MMMM dd, yyyy")}
                            <br/>
                            {format(this.props.date_of_wedding, "h:mm a")}
                          </Typography>
                        </Grid>
                      </Grid>
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
