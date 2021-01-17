import React from "react";
import {RouteComponentProps} from "react-router-dom";
import {createStyles, Theme, withStyles, WithStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {APIHost} from "../data/api";
import {withSignIn} from "react-auth-kit";
import {signInFunctionParams} from "react-auth-kit/dist/types";
import {differenceInMinutes, parseISO} from "date-fns";
import {BackroomUser} from "../types/backroom-user";

const styles = (theme: Theme) => createStyles({
  paper: {
    marginTop: theme.spacing(8),
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
  error?: string;
}

class Login extends React.Component<Props, State> {
  state: State = {
    username: "",
    password: "",
  };

  render() {
    const {classes} = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();

              fetch(`//${APIHost}/login`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  password: this.state.password,
                  username: this.state.username,
                }),
              })
                .then(response => response.json())
                .then(data => {
                  console.log(data);

                  const success = this.props.signIn({
                    token: data.token,
                    expiresIn: differenceInMinutes(parseISO(data.expire), Date.now()),
                    tokenType: "Bearer",
                    authState: data.user as BackroomUser,
                  });

                  if (success) {
                    this.props.history.push(`/backroom`);
                  } else {
                    this.setState({
                      error: "Unable to login.",
                    })
                  }
                });
            }}
            >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={this.state.username}
              onChange={(e) => this.setState({username: e.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
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
