import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import TopbarNotLogged from "../components/Topbar/TopbarNotLogged";
import Register from "../components/Register/Register";
import Login from "../components/Login/Login";
import axios from "axios";
import "./pages.scss";

export default function NotLoggedPage() {
  const testUserLogin = () => {
    const user = {
      email: "test@test",
      password: "test",
    };

    axios.post("http://localhost:5000/auth", user).then((res) => {
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      window.location = "/history";
    });
  };

  return (
    <div>
      <Link to="/" className="header">
        Macrolator
      </Link>
      <Switch>
        <Route exact path="/" component={TopbarNotLogged} />
        <Route exact path="/login" component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </div>
  );
}
