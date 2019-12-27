import App1 from "./components/App1/App1";
import App2 from "./components/App2/App2";
import { render } from "react-dom";
import React from "react";

render(
  <>
    <App1 />
    <App2 />
  </>,
  document.getElementById("root")
);
