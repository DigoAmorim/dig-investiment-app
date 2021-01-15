import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

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
import FundosImoComponent from "./components/FundosImoComponent";
import DividendosComponent from "./components/DividendosComponent";
import LoginComponent from "./components/LoginComponent";

function setToken(userToken) {

  console.log("Setando o token => " + userToken);
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken;
}

export default function App() {

  console.log("Passando no App.js");
  console.log(getToken());

  if(!getToken()) {
    return (
      <div>
        <Router>
          <LoginComponent setToken={setToken}/>
        </Router>
      </div>
    ); 
  }

  return (
    <div>
      <Router>
        <HeaderComponent/>
        <MenuComponent/>
        <div className="container">
          <Switch>
            <Route path="/operacoes" component={OperacaoComponent} />
            <Route path="/fundosImobiliarios" component={FundosImoComponent} />        
            <Route path="/dividendos" component={DividendosComponent}/>   <Route path="/login" component={LoginComponent}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
