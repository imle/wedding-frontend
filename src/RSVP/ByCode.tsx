import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {AxiosError} from "axios";
import axios from "../data/axios";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import {Party} from "../@types/invitee";
import {ErrorResponse, RsvpCodeResponse} from "../@types/responses";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
  finish(): void;

  code: string;
}

interface State {
  searching: boolean;
  party: Party | null;
  error?: string;
}

class ByCode extends React.Component<Props, State> {
  state: State = {
    searching: !!this.props.code,
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
    this.setState({
      searching: true,
    });

    axios.get<ErrorResponse | RsvpCodeResponse>(`/api/v1/invitee/${encodeURIComponent(code)}`)
      .then((response) => {
        if ("error" in response.data) {
          this.setState({
            error: response.data.error,
            searching: false,
          });
          return;
        }

        const data = response.data as RsvpCodeResponse;

        // Set this before setting the state so the checkboxes are auto selected if the value is null.
        data.party.edges.invitees!.forEach(i => {
          return i.rsvp_response = typeof i.rsvp_response === "boolean" ? i.rsvp_response : true;
        });

        this.setState({
          party: data.party,
          searching: false,
        });
      })
      .catch((result: AxiosError) => {
        console.error(result);

        let err: string = "";
        if (result.response && result.response.status !== 200) {
          switch (result.response.status) {
            case 404:
              err = "No guests found with that code."
              break;
          }
        }

        this.setState({
          error: err || "Unknown error occurred.",
          searching: false,
        });
      });
  }

  submitSelected: React.MouseEventHandler = () => {
    this.setState({
      searching: true,
    });

    axios.post<ErrorResponse>(`/api/v1/invitees`, this.state.party!.edges.invitees!)
      .then((response) => {
        if (response.data && "error" in response.data) {
          this.setState({
            error: response.data.error,
            searching: false,
          });
        } else {
          this.props.finish();
        }
      })
      .catch((result: AxiosError) => {
        console.error(result);

        let err: string = "";
        if (result.response && result.response.status !== 200) {
          switch (result.response.status) {
            case 403:
              err = "Not able to make those changes."
              break;
          }
        }

        this.setState({
          error: err || "Unknown error occurred.",
          searching: false,
        });
      });
  };

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
            {(() => {
              if (this.state.searching) {
                return (
                  <Box display="flex"
                       justifyContent="center">
                    <CircularProgress/>
                  </Box>
                );
              }

              if (this.state.error) {
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
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography align={"center"}>
                              {this.state.error}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
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
                          <Grid item xs={6}>
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
                      </Grid>
                    </Grid>
                  </Container>
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
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                  >
                    <Grid item xs={12}>
                      <Box sx={{display: "flex", height: "100%", justifyContent: "center"}}>
                        <Box className={classes.rsvp} p={0}>
                          <Grid container>
                            <Grid item xs={6}>
                              <Typography>Attending?</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              {this.state.party!.edges.invitees!.some(invitee => invitee.has_plus_one) ? (
                                <Typography align={"right"}>Plus One?</Typography>
                              ): (
                                <></>
                              )}
                            </Grid>
                          </Grid>
                          <Table>
                            <TableBody>
                              {this.state.party!.edges.invitees!.map((related, i) => (
                                <TableRow key={related.name}>
                                  <TableCell scope="row" sx={{p: 0, border: "none"}}>
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
                                              invitees: this.state.party!.edges.invitees!.map((value, index) => {
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
                                  </TableCell>
                                  <TableCell align="right" sx={{p: 0, border: "none"}}>
                                    {related.has_plus_one ? (
                                      <Checkbox
                                        sx={{pr: 0}}
                                        checked={!!related.plus_one_name}
                                        disabled={related.rsvp_response === false}
                                        value={related.plus_one_name}
                                        onChange={(event, checked) => this.setState({
                                          party: {
                                            ...this.state.party!,
                                            edges: {
                                              ...this.state.party!.edges,
                                              invitees: this.state.party!.edges.invitees!.map((value, index) => {
                                                if (i === index) {
                                                  value.plus_one_name = checked ? "yes" : undefined;
                                                }

                                                return value;
                                              }),
                                            },
                                          }
                                        })}
                                        name={related.name}
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
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
            })()}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(ByCode);
