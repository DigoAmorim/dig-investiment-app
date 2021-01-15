import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Button } from 'primereact/button';
import { useHistory } from "react-router-dom";
import { logar } from './Service/LoginService';

//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

export default function LoginComponent({ setToken }) {

  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();
  const history = useHistory();

  const efetuarLogin = async e => {
    e.preventDefault();
    console.log("Passou");
    const token = await logar({
      usuario,
      senha
    });
    setToken(token);
    // Refresh Screen
    history.go(0);
  }


  // Código que é carregado ao iniciar a aplicação
  useEffect(() => {
    //console.log("Método Inicial");
  }, []); // eslint-disable-line

  return (
    <div className="inside-content-login">
      <div className="login-panel">
        <div className="login-panel-content">
          <div className="p-fluid titulo-login">
          <span>Dig Investiment</span>
          </div>  
          <div className="p-fluid subtitulo-login">
          <span>Bem vindo, utilize o formulário abaixo para acessar a plataforma de acompanhamento de investimentos.</span>
          </div>

          <div className="p-fluid p-field">
              <div className="p-inputgroup">
                 <span className="p-inputgroup-addon">
                   <i className="pi pi-user"></i>
                 </span>
                 <InputText placeholder="Usuário" onChange={e => setUsuario(e.target.value)} />
             </div>
          </div>
          <div className="p-fluid p-field">
              <div className="p-inputgroup">
                 <span className="p-inputgroup-addon">
                   <i className="pi pi-key"></i>
                 </span>
                 <Password feedback={false} placeholder="Senha" onChange={e => setSenha(e.target.value)} />
             </div>
          </div>
          <div className="p-fluid p-field">
            <Button label="Acessar" icon="pi pi-check" onClick={efetuarLogin} className="p-button" />
          </div>
        </div>
      </div>
    </div>
    
  );
}

LoginComponent.propTypes = {
  setToken: PropTypes.func.isRequired
}
