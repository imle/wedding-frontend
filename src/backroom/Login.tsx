import React from "react";
import {RouteComponentProps} from "react-router-dom";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {APIHost} from "../data/api";
import {ErrorResponse, LoginResponse} from "../types/responses";
import {withSignIn} from "react-auth-kit";
import {signInFunctionParams} from "react-auth-kit/dist/types";

const styles = (theme: Theme) => createStyles({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  signIn(params: signInFunctionParams): boolean;
}

interface State {
  username: string;
  password: string;
  trying: boolean;
  error?: string;
}

class Login extends React.Component<Props, State> {
  state: State = {
    username: "",
    password: "",
    trying: false,
  };

  login() {
    this.setState({
      trying: true,
    });

    fetch(`//${APIHost}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => {
        if (response.status !== 200) throw response.status;

        return response.json()
      })
      .then((data: ErrorResponse | LoginResponse) => {
        if ("error" in data) {
          throw data;
        }

        const success = this.props.signIn({
          token: data.user.username,
          expiresIn: data.timeout,
          tokenType: "Bearer",
          authState: data.user,
        });

        if (success) {
          this.props.history.push("/backroom");
        } else {
          this.setState({
            error: "Unable to login.",
            trying: false,
          });
        }
      })
      .catch((reason: number | ErrorResponse) => {
        let err: string;
        if (typeof reason === "number") {
          switch (reason) {
            case 401:
              err = "Unable to log in with these credentials.";
              break;
            default:
              err = "Unknown error occurred.";
          }
        } else {
          err = reason.error;
        }

        this.setState({
          password: "",
          trying: false,
          error: err,
        });
      });
  }

  render() {
    const {classes} = this.props;

    let error: string = "";
    if (!!this.state.error && !this.state.trying) {
      error = this.state.error;
    }


    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();

              this.login();
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={this.state.username}
              onChange={(e) => this.setState({
                username: e.target.value,
                error: undefined,
              })}
              disabled={this.state.trying}
              error={!!error}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={(e) => this.setState({
                password: e.target.value,
                error: undefined,
              })}
              disabled={this.state.trying}
              error={!!error}
              helperText={!this.state.trying ? error : ""}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={this.state.trying}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}


export default withStyles(styles, {withTheme: true})(withSignIn(Login));