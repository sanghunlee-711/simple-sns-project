import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Reset } from "styled-reset";
import Loading from "./components/Loading/Loading";
import store from "./redux/store";
import RootRouter from "./routes";

ReactDOM.render(
  <Provider store={store}>
    <Reset />
    <RootRouter />
    <Loading />
  </Provider>,
  document.getElementById("root")
);
