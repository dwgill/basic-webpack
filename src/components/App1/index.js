import App1 from "./App1";
import { render } from "react-dom";
import React from "react";

export function renderApp1() {
  render(document.querySelector("body"), <App1 />);
}
