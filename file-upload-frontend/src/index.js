import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import store from "./redux-store";
import "./index.scss";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
