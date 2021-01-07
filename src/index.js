import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

//import "./fonts/Inter-UI-Regular.otf";
//import "./fonts/Inter-UI-SemiBold.otf";
//import "./fonts/Inter-UI-Bold.otf";

//Insert Styleshhet to render primeIcons
var link = document.createElement("link");
link.type = link.type = "text/css";
link.rel = "stylesheet";
link.href = "https://unpkg.com/primeicons@4.0.0/primeicons.css";
document.head.appendChild(link);
//Insert Styleshhet to render primeIcons

// Incluindo o Banco de Dados SQLite
//var dataBase = document.createElement("script");
//dataBase.src = "./components/DataBase/StartDB.js";
//document.getElementsByTagName("head")[0].appendChild(dataBase);

const rootElement = document.getElementById("root");
ReactDOM.render(

  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
