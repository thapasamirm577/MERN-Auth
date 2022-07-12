import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TestApi from "./api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
        {/* <TestApi /> */}
    </React.StrictMode>
);
