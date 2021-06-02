import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";
import Article from "../pages/Article/Article";
import Home from "../pages/Home/Home";
import Join from "../pages/Join/Join";
import Login from "../pages/Login/Login";
import Modify from "../pages/Modify/Modify";
import Search from "../pages/Search/Search";
import Tags from "../pages/Tags/Tags";
import User from "../pages/User/User";

const RootRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/join" component={Join} />
        <Route exact path="/article/:id" component={Article} />
        <Route exact path="/modify" component={Modify} />
        <Route exact path="/search/:searchWord" component={Search} />
        <Route exact path="/tag/:hashTag" component={Tags} />
        <Route exact path="/user/:userId?" component={User} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default RootRouter;
