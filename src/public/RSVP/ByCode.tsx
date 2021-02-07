import React from "react";
import {Link as RouterLink} from "react-router-dom";
import axios from "../../data/axios";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";

import {Party} from "../../types/invitee";
import {ErrorResponse, RsvpCodeResponse} from "../../types/responses";

const styles = (theme: Theme) => createStyles({
  root: {
    height: "100%",
  },
  rsvp: {
    minWidth: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      minWidth: 0,
    },
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

        // Set this before setting the state so the checkboxes are auto selected
        data.party.edges.Invitees!.forEach(i => i.rsvp_response = true);

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

  submitSelected: React.MouseEventHandler = () => {

  };

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
            <Box sx={{display: "flex", height: "100%", justifyContent: "center"}}>
              <Box className={classes.rsvp} p={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Attending?</FormLabel>
                  <FormGroup>
                    {this.state.party.edges.Invitees!.map((related, i) => (
                      <FormControlLabel
                        key={i}
                        control={<Checkbox
                          checked={related.rsvp_response}
                          value={related.rsvp_response}
                          onChange={(event, checked) => this.setState({
                            party: {
                              ...this.state.party!,
                              edges: {
                                ...this.state.party!.edges,
                                Invitees: this.state.party!.edges.Invitees!.map((value, index) => {
                                  if (i === index) {
                                    value.rsvp_response = checked;
                                  }

                                  return value;
                                }),
                              },
                            }
                          })}
                          name={related.name}
                        />}
                        label={related.name}
                      />
                    ))}
                  </FormGroup>
                  {this.state.error ? (
                    <FormHelperText>{this.state.error}</FormHelperText>
                  ) : (
                    <React.Fragment/>
                  )}
                </FormControl>
                <Box mt={2} display="flex" flexDirection="row-reverse">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.submitSelected}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(ByCode);
