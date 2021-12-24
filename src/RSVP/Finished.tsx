import React from "react";
import {Theme} from "@mui/material";
import {createStyles, withStyles, WithStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {differenceInCalendarDays} from "date-fns";
import Typography from "@mui/material/Typography";

const styles = (theme: Theme) => createStyles({
  root: {
    height: "100%",
  },
});

interface Props extends WithStyles<typeof styles> {
  date_of_wedding: Date;
}

interface State {
}

class Finished extends React.Component<Props, State> {
  state: State = {};

  render() {
    const {classes} = this.props;

    return (
      <Container className={classes.root} maxWidth="md">
        <Grid
          style={{
            height: "100%",
          }}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              See you in {differenceInCalendarDays(this.props.date_of_wedding.getTime(), (new Date()).getTime())} days!
            </Typography>
            <Typography variant="h6" align="center">
              You can come back and update this information at any time!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Finished);
