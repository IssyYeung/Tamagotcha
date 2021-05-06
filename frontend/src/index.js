import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { StatsContextProvider } from "./state/statsContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StatsContextProvider>
        <App />
      </StatsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
