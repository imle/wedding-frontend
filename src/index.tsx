import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import OuterApp from "./OuterApp";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

ReactDOM.render(
  (
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <OuterApp />
      </StyledEngineProvider>
    </React.StrictMode>
  ),
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
