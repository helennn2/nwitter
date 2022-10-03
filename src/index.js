import React from 'react';
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from './components/App';
import myBase from "./myBase";
import "../src/style.css";

/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 */

ReactDOM.render(
    <App />,
  document.getElementById("root")
);