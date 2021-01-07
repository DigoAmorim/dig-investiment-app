import React from 'react';
import { Button } from 'primereact/button';


export default function HeaderComponent() {

  let menu = 0; //0 - Menu fechado e 1 - Menu aberto.
  
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
      </div>

      

  </div>
  );
}