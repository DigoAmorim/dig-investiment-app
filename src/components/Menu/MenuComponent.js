import React from 'react';
import PropTypes from 'prop-types';

export default function MenuComponent({ setToken }) {

    const efetuarLogout = async e => {

        setToken(null);
        window.location.reload(false);
      }

  return (
     
    <div id="menuId" className="inv-layout-menu-container">
    <ul className="inv-layout-menu">
        <li className="inv-layout-root-menuitem"> {/* Talvez possa remover a classe*/}
          <div className="inv-layout-menuitem-root-text">Favorites</div>
            <ul className="p-toggleable-content-enter-done">
                {/* Dashboard */}
                <li>
                    <a className="p-ripple active-menuitem-routerlink" href="">
                        <i className="inv-layout-menuitem-icon pi pi-fw pi-chart-line"/>
                        <span className="inv-layout-menuitem-text">Dashboard</span>
                    </a>
                </li>
                {/* Operações */}
                <li>
                    <a className="p-ripple active-menuitem-routerlink" href="/operacoes">
                        <i className="inv-layout-menuitem-icon pi pi-fw pi-check-square"/>
                        <span className="inv-layout-menuitem-text">Operações</span>
                    </a>
                </li>
                {/* Dividendos */}
                <li>
                    <a className="p-ripple active-menuitem-routerlink" href="/dividendos">
                        <i className="inv-layout-menuitem-icon pi pi-fw pi-money-bill"/>
                        <span className="inv-layout-menuitem-text">Dividendos</span>
                    </a>
                </li>
                {/* Fundos Imobiliários */}
                <li>
                    <a className="p-ripple active-menuitem-routerlink" href="/fundosImobiliarios">
                        <i className="inv-layout-menuitem-icon pi pi-fw pi-home"/>
                        <span className="inv-layout-menuitem-text">Fundos Imobiliários</span>
                    </a>
                </li>
                {/* Fundos de Ações */}
                <li>
                    <a className="p-ripple active-menuitem-routerlink" href="/login">
                        <i className="inv-layout-menuitem-icon pi pi-fw pi-briefcase"/>
                        <span className="inv-layout-menuitem-text">Fundos de Ações</span>
                    </a>
                </li>
                {/* Tesouro Direto */}
                <li>
                    <a className="p-ripple active-menuitem-routerlink" href="">
                        <i className="inv-layout-menuitem-icon pi pi-fw pi-star-o"/>
                        <span className="inv-layout-menuitem-text">Tesouro Direto</span>
                    </a>
                </li>
                {/* IR */}
                <li>
                    <a className="p-ripple active-menuitem-routerlink" href="">
                        <i className="inv-layout-menuitem-icon pi pi-fw pi-id-card"/>
                        <span className="inv-layout-menuitem-text">Imposto de Renda</span>
                    </a>
                </li>                            
                {/* Patrimônio */}
                <li>
                    <a className="p-ripple active-menuitem-routerlink" href="">
                        <i className="inv-layout-menuitem-icon pi pi-fw pi-dollar"/>
                        <span className="inv-layout-menuitem-text">Patrimônio</span>
                    </a>
                </li>                               {/* Sair */}
                <li>
                    <a className="p-ripple active-menuitem-routerlink" onClick={efetuarLogout} href="/">
                        <i className="inv-layout-menuitem-icon pi pi-fw pi-times"/>
                        <span className="inv-layout-menuitem-text">Sair</span>
                    </a>
                </li>                                
            </ul>
        </li>
    </ul>
</div>

  );

}

MenuComponent.propTypes = {
    setToken: PropTypes.func.isRequired
  }