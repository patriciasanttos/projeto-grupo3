import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Tooltip } from "react-tooltip";

import "./index.css";
import "react-tooltip/dist/react-tooltip.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <Tooltip id="tooltip" />
  </>
);
