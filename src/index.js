import App from "./components/App/App";
import { render } from "react-dom";
import React from "react";

render(
  <App userId={"foo"} userAuth={"bar"} />,
  document.getElementById("root")
);
