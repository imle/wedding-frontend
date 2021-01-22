import React from "react";
import RefreshToken from "react-auth-kit/dist/RefreshToken";
import {differenceInMilliseconds, isBefore} from "date-fns";
import {Route, Switch} from "react-router-dom";
import {PrivateRoute, withRefreshToken} from "react-auth-kit";
import BackroomLogin from "./Login";
import BackroomApp from "./App";
import {APIHost} from "../data/api";

interface Props {
  refreshToken: RefreshToken;
}

interface State {
}

// Not sure how to put this in State.
let timeout: NodeJS.Timeout | null = null;

class App extends React.PureComponent<Props, State> {
  state: State = {};

  componentWillUnmount() {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  componentDidMount() {
    this.setupRefresh();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    this.setupRefresh();
  }

  setupRefresh = () => {
    const authState = this.props.refreshToken.getCurrentAuthState();
    const refreshToken = this.props.refreshToken.getCurrentRefreshToken();

    if (!refreshToken.refreshToken) {
      return;
    }

    console.log(authState.expireAt, new Date(Date.now() - 500));

    if (authState.expireAt === null) {
      // do nothing
    } else if (isBefore(authState.expireAt, Date.now() - 500)) {
      this.refresh();
    } else {
      timeout = setTimeout(this.refresh, differenceInMilliseconds(authState.expireAt, Date.now() - 1000));
    }
  };

  refresh = () => {
    const authState = this.props.refreshToken.getCurrentAuthState();

    fetch(`//${APIHost}/api/auth/refresh_token`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authState.authToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        this.props.refreshToken.updateAuthState(data.token, "Bearer", data.expire);
      });
  };

  render() {
    return (
      <Switch>
        <Route path="/backroom/login" component={BackroomLogin}/>
        <PrivateRoute path="/backroom" loginPath="/backroom/login" component={BackroomApp}/>
      </Switch>
    );
  }
}

export default withRefreshToken(App);
