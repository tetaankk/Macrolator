import React from "react";
import { Route, Switch } from "react-router-dom";
import TopbarLogged from "../components/TopbarLogged";
import FoodsList from "../components/FoodList.jsx";
import EditFood from "../components/EditFood";
import LogPortionView from "../components/LogPortionView";

export default function LoggedPage() {
  return (
    <div>
      <TopbarLogged />
      <Switch>
        <Route path="/history" exact component={FoodsList} />
        <Route path="/edit/:id" exact component={EditFood} />
        <Route path="/create" component={LogPortionView} />
      </Switch>
    </div>
  );
}
