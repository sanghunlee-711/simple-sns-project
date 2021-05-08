import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default RootRouter;
