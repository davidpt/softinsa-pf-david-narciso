import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //StrictMode will render everything twice while on development but not production
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
