import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { Button } from 'primereact/button';
import classNames from 'classnames';
import { ProgressSpinner } from 'primereact/progressspinner';
import { logar } from './Service/LoginService';

//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

export default function LoginComponent({ setToken }) {

  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const efetuarLogin = async e => {

    setSubmitted(true);
    if ((usuario !== undefined) && (senha !== undefined)) {

      setCarregando(true);

      e.preventDefault();
      const token = await logar({
        usuario,
        senha
      });
      console.log(token);
      setToken(token);
      window.location.reload(false);
    }
  }

  // Código que é carregado ao iniciar a aplicação
  useEffect(() => {

  }, []); // eslint-disable-line

  const Carregando = () => (
    <div className="p-fluid p-field subtitulo-login" style={{ textAlign: 'center' }}>
      <ProgressSpinner className="inv-p-progress-spinner-circle" style={{ width: '30px', height: '30px' }} strokeWidth="8" /> Carregando...
    </div>
  )

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
              <InputText placeholder="Usuário"  value={usuario} required onChange={e => setUsuario(e.target.value)} className={classNames({ 'p-invalid': submitted && !usuario })} />
            </div>
          </div>
          <div className="p-fluid p-field">
            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-key"></i>
              </span>
              <Password feedback={false} required value={senha} placeholder="Senha" onChange={e => setSenha(e.target.value)} className={classNames({ 'p-invalid': submitted && !senha })} />
            
            </div>
          </div>
          <div className="p-fluid p-field">
            <Button label="Acessar" icon="pi pi-check" onClick={efetuarLogin} className="p-button" />
          </div>
          { carregando ? <Carregando /> : null }
        </div>
      </div>
    </div>
  );
  
}

LoginComponent.propTypes = {
  setToken: PropTypes.func.isRequired
}
