import React from "react";
import {format} from "date-fns";
import {createStyles, Theme} from "@mui/material";
import {WithStyles, withStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Image} from "@crystallize/react-image";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import venue_large from "./photos/the-estate.jpg";
import piedmont_park from "./photos/piedmont-park-atlanta.jpg";
import hero from "./photos/hero.png";

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
    [theme.breakpoints.up("sm")]: {
      marginTop: "0vh",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "-2vh",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "-6vh",
    },
    [theme.breakpoints.up("xl")]: {
      marginTop: "-12vh",
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
              url={hero}
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
                  <Image
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      width: "auto",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    url={piedmont_park}
                    variants={[
                      {url: piedmont_park, width: 3008, height: 1692},
                    ]}
                    altText={"season"}
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
    );
  }
}

export default withStyles(styles, {withTheme: true})(Home);
