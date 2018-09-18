// @flow
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const root = (document.getElementById("root"): any);

ReactDOM.render(<App />, root);
registerServiceWorker();
