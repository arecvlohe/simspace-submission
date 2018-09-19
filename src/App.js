// @flow
import React, { Component } from "react";
import { Router } from "@reach/router";
import "normalize.css";

import { globalStyles } from "./theme";
import Home from "./Home";

globalStyles();

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
