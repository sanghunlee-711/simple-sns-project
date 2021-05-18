import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";
import Home from "../pages/Home/Home";
import Join from "../pages/Join/Join";
import Login from "../pages/Login/Login";
import Post from "../pages/Post/Post";

const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/join" component={Join} />
        <Route exact path="/post" component={Post} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default RootRouter;
