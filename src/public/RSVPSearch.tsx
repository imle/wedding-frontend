import React from "react";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {ErrorResponse, Invitee, InviteeSearchResponse} from "../types/invitee";
import {CircularProgress} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

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
  setRsvpCode: (code: string) => void;
}

interface State {
  searching: boolean;
  matches: Invitee[] | null;
  error?: string;
  full_name: string;
  selected_code: string | null;
}

class RSVPSearch extends React.Component<Props, State> {
  state: State = {
    searching: false,
    matches: null,
    full_name: "",
    selected_code: null,
  };

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (this.state.matches && this.state.matches.length === 1) {
      this.props.setRsvpCode(this.state.matches[0].code);
    }
  }

  searchForInviteeCode = (name: string) => {
    fetch(`//${window.location.hostname}:8080/apiv1/invitee?query=${encodeURIComponent(name)}`)
      .then((response) => response.json())
      .then((data: ErrorResponse | InviteeSearchResponse) => {
        if ("error" in data) throw data;

        return data;
      })
      .then((data: InviteeSearchResponse) => {
        this.setState({
          matches: data.matches,
          searching: false,
        });
      })
      .catch((reason: ErrorResponse) => {
        this.setState({
          error: reason.error,
          searching: false,
        });
      });
  };

  submitSearch = (e: React.FormEvent) => {
    e.preventDefault();

    this.setState({
      searching: true,
    });

    this.searchForInviteeCode(this.state.full_name);
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
        <Container className={classes.root} maxWidth="md">
          <Grid item xs={12}>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={this.submitSelectedCode}>
              <Box display="flex" justifyContent="center">
                <Box>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Matches</FormLabel>
                    <RadioGroup value={this.state.selected_code} onChange={this.setSelectedCode}>
                      {this.state.matches.map((match) => (
                        <FormControlLabel key={match.code} value={match.code} control={<Radio/>} label={match.name}/>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <Button
                    className={classes.margin}
                    variant={"contained"}
                    color={"primary"}
                    fullWidth
                    disabled={!this.state.selected_code}
                    onClick={this.submitSelectedCode}
                  >
                    Select
                  </Button>
                </Box>
              </Box>
            </form>
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
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography>
              If you're responding for you and a guest (or your family),
              you'll be able to RSVP for your entire group.
            </Typography>
          </Box>
          <form className={classes.form} noValidate autoComplete="off" onSubmit={this.submitSearch}>
            <TextField
              className={classes.margin}
              label="Full Name"
              variant="outlined"
              fullWidth
              value={this.state.full_name}
              onChange={e => this.setState({
                full_name: e.target.value,
                matches: null,
              })}
              disabled={this.state.searching}
              error={!!error}
              helperText={!this.state.searching ? error : ""}
            />
            <Button
              className={classes.margin}
              variant={"contained"}
              color={"primary"}
              fullWidth
              disabled={this.state.searching}
              onClick={this.submitSearch}
            >
              Find Your Invitation
            </Button>
          </form>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, {withTheme: true})(RSVPSearch);
