import React from "react";

//CSS
import './css/theme-blue.css';
import './css/investiment.css';
import './css/layout-blue.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/primereact.css';
import HeaderComponent from "./components/Header/HeaderComponent";
import MenuComponent from "./components/Menu/MenuComponent";
import OperacaoComponent from "./components/OperacaoComponent";

//import DatabaseConnection from "./database/DatabaseConnection";

export default function App() {

  return (
    <div>
      <HeaderComponent/>
      <MenuComponent/>
      <OperacaoComponent/>
    </div>  
  );
}
