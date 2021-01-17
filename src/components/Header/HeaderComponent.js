import React from 'react';
import { Button } from 'primereact/button';


export default function HeaderComponent() {

  let menu = 0; //0 - Menu fechado e 1 - Menu aberto.

  function getNome() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken[0].carteira;
  }
  
  const abrirFecharMenu = () => {
    if (menu === 0) {
      document.getElementById("menuId").style.width = "230px"
      menu = 1;
    } else {
      document.getElementById("menuId").style.width = "0%";
      menu = 0;
    }
  }

  return (
    <div>    
      
      {/* Barra Azul superior */}

      <div className="inv-layout-topbar">
        <Button icon="pi pi-bars" className="p-link inv-layout-menu-button" onClick={abrirFecharMenu} />
        <span className="inv-layout-log">Dig Investment</span>
        <ul className="top-bar-menu">
          <li className="user-profile">
          <img className="avatar-imagem" src="https://img.icons8.com/bubbles/2x/user.png" alt="profile"/><div className="layout-profile-userinfo"><span className="inv-layout-log-right">{getNome()}</span></div></li>
          
          
        </ul>
      </div>

      

  </div>
  );
}