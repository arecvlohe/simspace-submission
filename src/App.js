// @flow
import React, { Component } from "react";
import { Router } from "@reach/router";

import Home from "./Home";

type Props = {};

type State = {};

class App extends Component<Props, State> {
  render() {
    return (
      <Router>
        <Home path="/*" />
      </Router>
    );
  }
}

export default App;
