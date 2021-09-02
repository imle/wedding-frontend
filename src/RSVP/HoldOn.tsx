import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme: Theme) => createStyles({
  root: {
    height: "100%",
  },
});

interface Props extends WithStyles<typeof styles> {
}

interface State {
}

class HoldOn extends React.Component<Props, State> {
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
            <Typography variant="h6" align="center">
              Sorry for the delay but we aren't quite ready to accept RSVPs yet!
              Please check back later!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(HoldOn);
