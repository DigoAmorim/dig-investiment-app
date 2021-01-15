import axios from 'axios';

const DIGINVEST_API_BASE_URL = "https://dig-investiment-api.herokuapp.com/";

export async function logar(credenciais) {
  
  return axios.get(DIGINVEST_API_BASE_URL + "credenciais", {
    params: {
      usuario: credenciais.usuario,
      senha: credenciais.senha
    }
  })
   .then(res => res.data)
}
