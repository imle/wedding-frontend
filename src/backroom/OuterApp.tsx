import React from "react";
import {PrivateRoute} from "react-auth-kit";
import {Route, Switch} from "react-router-dom";
import BackroomLogin from "./Login";
import BackroomApp from "./App";

interface Props {
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

  render() {
    return (
      <Switch>
        <Route path="/backroom/login" component={BackroomLogin}/>
        <PrivateRoute path="/backroom" loginPath="/backroom/login" component={BackroomApp}/>
      </Switch>
    );
  }
}

export default App;
