import axios from 'axios';

const DIGINVEST_API_BASE_URL = "https://dig-investiment-api.herokuapp.com/";

export function getDividendos() {
  
  return axios.get(DIGINVEST_API_BASE_URL+'dividendos').then(res => res.data);
}

export function getTotalDividendos(dividendos, carteira) {
  let total = 0;

  for (let i = 0; i < dividendos.length; i++) {
    if (dividendos[i].carteira === carteira) {
      total += (dividendos[i].rendimento * dividendos[i].qtd);
    }
  }
  return total;
}

// Método que faz a inclusão de uma operação no JSON Server
export function addDividendo(dividendo) {

  return axios.post(DIGINVEST_API_BASE_URL + 'dividendos', {
    carteira: dividendo.carteira,
    ativo: dividendo.ativo,
    rendimento: dividendo.rendimento,
    qtd: dividendo.qtd,
    data: dividendo.data
  });
}

// Método que faz a exclusão de uma operação no JSON Server

// TODO: Refatorar no futuro para fazer uma únic chamada passando uma lista de operações a serem removidas.
export function deleteDividendo(dividendos) {

  for (let i = 0; i < dividendos.length; i++) {

    axios.delete(DIGINVEST_API_BASE_URL + 'dividendos/' + dividendos[i].id);

  }  
   
}