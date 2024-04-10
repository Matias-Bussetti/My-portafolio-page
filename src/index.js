import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//Folder
import Folder from "./folder/Folder";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

const folder = ReactDOM.createRoot(document.getElementById("folder"));
folder.render(<Folder />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
