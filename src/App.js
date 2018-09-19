// @flow
import React, { Component } from "react";
import { Router } from "@reach/router";
import "normalize.css";

import Home from "./Home";
import { globalStyles } from "./theme";

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
