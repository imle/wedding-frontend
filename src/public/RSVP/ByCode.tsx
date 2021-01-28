import React from "react";
import axios from "../../data/axios";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Card, CircularProgress} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";
import Box from "@material-ui/core/Box";

import {Party} from "../../types/invitee";
import {ErrorResponse, RsvpCodeResponse} from "../../types/responses";

const styles = (theme: Theme) => createStyles({
  root: {
    height: "100%",
  },
});

interface Props extends WithStyles<typeof styles> {
  code: string;
}

interface State {
  searching: boolean;
  party: Party | null;
  error?: string;
}

class ByCode extends React.Component<Props, State> {
  state: State = {
    searching: false,
    party: null,
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

  getInviteeFromCode = (code: string) => {
    axios.get<ErrorResponse | RsvpCodeResponse>(`/api/v1/invitees/${encodeURIComponent(code)}`)
      .then((response) => {
        let err: string | null = null;
        if (response.status !== 200) {
          switch (response.status) {
            case 404:
              err = "No guests found with that code."
              break;
            default:
              err = "Unknown error occurred."
          }
        } else if ("error" in response.data) {
          err = response.data.error;
        }

        if (err !== null) {
          this.setState({
            error: err,
            searching: false,
          });
          return;
        }

        const data = response.data as RsvpCodeResponse;

        this.setState({
          party: data.party,
          searching: false,
        });
      })
      .catch((reason) => {
        console.error(reason);

        this.setState({
          error: reason.toString(),
          searching: false,
        });
      });
  }

  render() {
    const {classes} = this.props;

    if (this.state.error) {
      return (
        <Container className={classes.root} maxWidth="md">
          <Grid
            style={{
              height: "100%",
            }}
            container
            direction="row"
            justifyItems="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={12}>
              <Typography align={"center"}>
                {this.state.error}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box mt={2} mb={2}>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  fullWidth
                  component={RouterLink}
                  to={"/rsvp"}
                >
                  Search By Name
                </Button>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box mt={2} mb={2}>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  fullWidth
                  // onClick={this.submitSearch}
                >
                  Try Another Code
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      );
    }

    if (!this.state.party) {
      return (
        <CircularProgress/>
      );
    }

    return (
      <Container className={classes.root} maxWidth="md">
        <Grid
          style={{
            height: "100%",
          }}
          container
          direction="row"
          justifyItems="center"
          alignItems="center"
          spacing={0}
        >
          <Grid item xs={12}>
            <Card>
              <Typography align={"center"}>
                {this.state.party.edges.Invitees!.map((related, i) => (
                  <React.Fragment key={i}>Name: {related.name}<br/></React.Fragment>
                ))}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(ByCode);
