import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {ErrorResponse, Invitee, InviteeRsvpCodeResponse} from "../types/invitee";
import {CircularProgress} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";

const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: "calc(50vh - 200px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  form: {
    display: "block",
    width: "100%",
  },
  margin: {
    margin: theme.spacing(1, 0),
  },
});

interface Props extends WithStyles<typeof styles> {
  code: string;
}

interface State {
  searching: boolean;
  invitee: Invitee | null;
  error?: string;
}

class RSVPByCode extends React.Component<Props, State> {
  state: State = {
    searching: false,
    invitee: null,
  };

  componentDidMount() {
    if (this.props.code) {
      this.getInviteeFromCode(this.props.code);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (this.props.code && this.props.code !== prevProps.code) {
      this.getInviteeFromCode(this.props.code);
    }
  }

  getInviteeFromCode = (code: string, callback?: () => void) => {
    fetch(`//${window.location.hostname}:8080/apiv1/invitee/${encodeURIComponent(code)}`)
      .then((response) => {
        if (response.status === 404) throw response.status;

        return response.json()
      })
      .then((data: ErrorResponse | InviteeRsvpCodeResponse) => {
        if ("error" in data) throw data;

        return data;
      })
      .then((data: InviteeRsvpCodeResponse) => {
        this.setState({
          invitee: data.invitee,
          searching: false,
        });
      })
      .catch((reason: number | ErrorResponse) => {
        let err: string;
        if (typeof reason === "number") {
          switch (reason) {
            case 404:
              err = "No guests found with that code."
              break;
            default:
              err = "Unknown error occurred."
          }
        } else {
          err = reason.error;
        }

        this.setState({
          error: err,
          searching: false,
        });
      });
  }

  render() {
    const {classes} = this.props;

    if (this.state.error) {
      return (
        <Container className={classes.root} maxWidth="md">
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <Typography align={"center"}>
                {this.state.error}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                className={classes.margin}
                variant={"contained"}
                color={"primary"}
                fullWidth
                component={RouterLink}
                to={"/rsvp"}
              >
                Search By Name
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                className={classes.margin}
                variant={"contained"}
                color={"primary"}
                fullWidth
                // onClick={this.submitSearch}
              >
                Try Another Code
              </Button>
            </Grid>
          </Grid>
        </Container>
      );
    }

    if (this.state.invitee === null) {
      return (
        <CircularProgress/>
      );
    }

    return (
      <Container className={classes.root} maxWidth="md">
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <Typography align={"center"}>
              Name: {this.state.invitee.name}
              {this.state.invitee.edges.Party.edges.Invitees
                .filter((related) => related.code !== this.state.invitee!.code)
                .map((related, i) => (
                  <React.Fragment key={i}><br/>Name: {related.name}</React.Fragment>
                ))
              }
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(RSVPByCode);
