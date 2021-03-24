import React from "react";
import {format} from "date-fns";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Image} from "@crystallize/react-image";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import venue_large from "../photos/the-estate.jpg";
import piedmont_park from "../photos/piedmont-park-atlanta.jpg";

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
      marginTop: "-10vh",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "-16vh",
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "-23vh",
    },
    [theme.breakpoints.up("xl")]: {
      marginTop: "-34vh",
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
              url={"https://lh3.googleusercontent.com/pvJyQfZ4kFZGmYKEEXyUOA3tF2vAnsAYCHrYGzWW77CBN1rW4X3KumqVjMLJDXMDtAkVuheGqG6VwFHmD-q4MXpt_gOY3mLRtpMJovuSeS13b6J88cl-WiAkE1AyhdntkAvJg3r_Xw=w2400"}
              // url={"https://lh3.googleusercontent.com/DrZpea1vIN694m3504T4R5om4ytQiRhVUs9I_FDaI24K4ZIHvBTmXIbrgD9BQ6HjMbfb7eLgxZlVi_wCaWpYoUW-_W0mytj1AdOSazMC9x3hbvjl6F2CtDXTqNFZ7rQxZ7icOykamg=w2400"}
              // variants={[
              //   {url: hero_small, width: 427, height: 640},
              //   {url: hero_large, width: 1920, height: 1281},
              //   {url: hero_original, width: 6016, height: 4016},
              // ]}
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
