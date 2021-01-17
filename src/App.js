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

  if (userToken == null) {
    sessionStorage.removeItem('token'); 
  } else {
    sessionStorage.setItem('token', JSON.stringify(userToken));
  }
  
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  if (tokenString != null) {
    const userToken = JSON.parse(tokenString);
    if (userToken.length < 1) {
      return null;
    }
    return userToken;
  }
}

export default function App() {

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
        <MenuComponent setToken={setToken}/>
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
