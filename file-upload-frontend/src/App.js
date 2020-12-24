import React from "react";
import { Switch, Route } from "react-router-dom";

import { routes } from "./routes";
import Header from "./components/Header";

const createRoutes = (routes) => {
  return routes.map((route, index) => (
    <Route
      component={route.component}
      path={route.path}
      key={index}
      exact={true}
    />
  ));
};

const App = () => {
  return (
    <div className="app">
      <Header />
      <Switch>{createRoutes(routes)}</Switch>
    </div>
  );
};

export default App;
