import React from "react";
import axios from "../../data/axios";
import {RouteComponentProps} from "react-router";
import {withRouter} from "react-router-dom";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {CircularProgress} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import {Party} from "../../types/invitee";
import {ErrorResponse, InviteeSearchResponse} from "../../types/responses";

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

    if (!params.has("q")) {
      return {
        matches: null,
      };
    }

    if (prevState.name !== "" && prevState.matches !== null) {
      return null;
    }

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
    const params = new URLSearchParams(this.props.location.search);

    if (params.has("q")) {
      this.searchForInviteeCode(params.get("q") as string);
    }
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    const params = new URLSearchParams(this.props.location.search);

    if (this.state.matches && this.state.matches.length === 1) {
      this.props.setRsvpCode(this.state.matches[0].code);
    } else if (this.state.matches === null && params.get("q") === this.state.name) {
      this.searchForInviteeCode(this.state.name);
    }
  }

  searchForInviteeCode = (name: string) => {
    axios.get<ErrorResponse | InviteeSearchResponse>(`/api/v1/invitees?query=${encodeURIComponent(name)}`)
      .then((response) => {
        let err: string | null = null;
        if (response.status !== 200) {
          switch (response.status) {
            case 404:
              err = "No guests match your search."
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

    this.props.history.push({
      pathname: this.props.history.location.pathname,
      search: `?q=${this.state.name}`,
    });

    this.setState({
      searching: true,
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

    if (this.state.searching) {
      return (
        <CircularProgress/>
      );
    }

    if (this.state.matches && this.state.matches.length > 1) {
      return (
        <Container className={classes.root} maxWidth="sm">
          <Grid
            style={{
              height: "100%",
            }}
            container
            direction="row"
            justifyItems="center"
            alignItems="center"
            spacing={0}

            component="form"
            noValidate
            autoComplete="off"
            onSubmit={this.submitSelectedCode}
          >
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Matches</FormLabel>
                <RadioGroup value={this.state.selected_code} onChange={this.setSelectedCode}>
                  {this.state.matches.map((match) => (
                    <FormControlLabel
                      key={match.code}
                      value={match.code}
                      control={<Radio/>}
                      label={match.edges.Invitees!.map((i) => i.name).join(", ")}/>
                  ))}
                </RadioGroup>
              </FormControl>
              <Box mt={2} display="flex" flexDirection="row-reverse">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!this.state.selected_code}
                  onClick={this.submitSelectedCode}
                >
                  Select
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      );
    }

    let error: string = "";
    if (!!this.state.error && !this.state.searching) {
      error = this.state.error;
    } else if (this.state.matches && this.state.matches.length === 0) {
      error = "No guests found matching that search.";
    }

    return (
      <Container className={classes.root} maxWidth="md">
        <Grid
          style={{height: "100%"}}
          container
          direction="row"
          justifyItems="center"
          alignItems="center"
        >
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
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(withRouter(Search));
