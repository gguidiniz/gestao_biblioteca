import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Importação do CSS do Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importação do JavaScript do Bootstrap
import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
