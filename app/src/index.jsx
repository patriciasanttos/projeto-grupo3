import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Tooltip } from "react-tooltip";
import { ToastContainer } from 'react-toastify';

import "./index.css";
import "react-tooltip/dist/react-tooltip.css";
import 'reactjs-popup/dist/index.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <Tooltip id="tooltip" />
    <ToastContainer position="top-center" />
  </>
);
