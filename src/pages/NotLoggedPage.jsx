import React from "react";
import { Route, Switch } from "react-router-dom";
import TopbarNotLogged from "../components/TopbarNotLogged";
import Register from "../components/Register";
import Login from "../components/Login";

export default function NotLoggedPage() {
  return (
    <div>
      <TopbarNotLogged />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </div>
  );
}
