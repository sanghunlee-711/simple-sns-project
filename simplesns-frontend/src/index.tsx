import React from "react";
import ReactDOM from "react-dom";
import { Reset } from "styled-reset";
import RootRouter from "./routes";

const RenderComponent = (): JSX.Element => (
  <>
    <Reset />
    <RootRouter />
  </>
);

ReactDOM.render(<RenderComponent />, document.getElementById("root"));
