import React from "react";
import axios from "../data/axios";
import {RouteComponentProps} from "react-router";
import {withRouter} from "react-router-dom";
import {Theme} from "@mui/material";
import {createStyles, withStyles, WithStyles} from "@mui/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {Party} from "../@types/invitee";
import {ErrorResponse, InviteeSearchResponse} from "../@types/responses";
import {LocationDescriptor} from "history";

const styles = (theme: Theme) => createStyles({
  root: {
    height: "100%",
  },
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  setRsvpCode(code: string): void;
}

interface State {
  searching: boolean;
  matches: Party[] | null;
  error?: string;
  name: string;
  selected_code: string | null;
}

class Search extends React.Component<Props, State> {
  state: State = {
    searching: false,
    matches: null,
    name: "",
    selected_code: null,
  };

  static getDerivedStateFromProps(nextProps: Readonly<Props>, prevState: State): Partial<State> | null {
    const params = new URLSearchParams(nextProps.location.search);

    // If there is no query, then there should be no matches.
    // History.back results in this being triggered.
    if (!params.has("q")) {
      return {
        matches: null,
      };
    }

    // If there was a search error, don't try to intercept the state as they will want to change the query.
    if (!!prevState.error) {
      return null;
    }

    // If they have set a name and there are matches, do not intercept.
    if (prevState.name !== "" && !!prevState.matches) {
      return null;
    }

    // If the page was loaded with a query, we need to initialize that.
    // Since this is called before componentDidMount, this will trigger the search.
    if (params.has("q")) {
      return {
        name: params.get("q") as string,
        searching: true,
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    if (!!this.state.name) {
      this.searchForInviteeCode(this.state.name);
    }
  }

  searchForInviteeCode = (name: string) => {
    axios.get<ErrorResponse | InviteeSearchResponse>(`/api/v1/invitees?query=${encodeURIComponent(name)}`)
      .then((response) => {
        let err: string | null = null;
        if (response.status !== 200) {
          switch (response.status) {
            default:
              err = "Unknown error occurred."
          }
        } else if ("error" in response.data) {
          err = response.data.error;
        } else if (response.data.matches.length === 0) {
          err = "No guests found matching that search." +
            " If you believe this is an error, please contact the bride and groom";
        }

        if (err !== null) {
          this.setState({
            error: err,
            searching: false,
          });
          return;
        }

        const data = response.data as InviteeSearchResponse;

        this.setState({
          matches: data.matches,
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
  };

  submitSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(this.props.location.search);

    const next_history: LocationDescriptor = {
      pathname: this.props.history.location.pathname,
      search: `?q=${this.state.name}`,
    };

    if (params.has("q")) {
      this.props.history.replace(next_history);
    } else {
      this.props.history.push(next_history);
    }

    this.setState({
      searching: true,
      error: undefined,
    });

    this.searchForInviteeCode(this.state.name);
  };

  setSelectedCode = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    this.setState({
      selected_code: value,
    });
  };

  submitSelectedCode = () => {
    if (this.state.selected_code) {
      this.props.setRsvpCode(this.state.selected_code);
    }
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

              if (this.state.matches && this.state.matches.length > 0) {
                console.log(this.state.matches);

                return (
                  <Grid
                    item
                    xs={12}

                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                      e.preventDefault();
                      this.submitSelectedCode();
                      return false;
                    }}
                  >
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Matches</FormLabel>
                      <RadioGroup value={this.state.selected_code} onChange={this.setSelectedCode}>
                        {this.state.matches.map((match) => (
                          <FormControlLabel
                            key={match.code}
                            value={match.code}
                            control={<Radio/>}
                            label={match.edges.invitees!.map((i) => i.name).join(", ")}/>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <Box mt={2} display="flex" flexDirection="row-reverse">
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.state.selected_code}
                        onSubmit={(e) => {
                          e.preventDefault();
                          this.submitSelectedCode();
                        }}
                      >
                        Select
                      </Button>
                    </Box>
                  </Grid>
                );
              }

              let error: string = "";
              if (!!this.state.error && !this.state.searching) {
                error = this.state.error;
              }

              return (
                <Grid
                  item
                  xs={12}
                  component="form"
                  noValidate
                  autoComplete="off"
                  onSubmit={this.submitSearch}
                >
                  <Box mb={2}>
                    <Typography>
                      If you're responding for you and a guest (or your family),
                      you'll be able to RSVP for your entire group.
                    </Typography>
                  </Box>
                  <Box mt={2} mb={2}>
                    <TextField
                      label="Search by name"
                      variant="outlined"
                      fullWidth
                      autoFocus
                      value={this.state.name}
                      onChange={e => this.setState({
                        name: e.target.value,
                        matches: null,
                      })}
                      disabled={this.state.searching}
                      error={!!error}
                      helperText={!this.state.searching ? error : ""}
                    />
                  </Box>
                  <Box mt={2} mb={2}>
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      fullWidth
                      disabled={this.state.searching}
                      onClick={this.submitSearch}
                    >
                      Find Your Invitation
                    </Button>
                  </Box>
                </Grid>
              );
            })()}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(Search));
