import App2 from "./App2";
import { render } from "react-dom";
import React from "react";
import App1 from "../App1/App1";

export function renderApp2() {
  render(document.querySelector("body"), <App1 />);
}
