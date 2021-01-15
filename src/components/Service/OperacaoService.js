import axios from 'axios';

const DIGINVEST_API_BASE_URL = "https://dig-investiment-api.herokuapp.com/";

export function getOperacoes() {
  
  return axios.get(DIGINVEST_API_BASE_URL+'operacoes').then(res => res.data);
}

// Método que faz a inclusão de uma operação no JSON Server
export function addOperacao(operacao) {

  return axios.post(DIGINVEST_API_BASE_URL + 'operacoes', {
      carteira: operacao.carteira,
      ativo: operacao.ativo,
      tipo: operacao.tipo,
      data: operacao.data,
      qtd: operacao.qtd,
      precoUnitario: operacao.precoUnitario,
      taxa: operacao.taxa,
      numNota: operacao.numNota,
      custo: operacao.custo
    });
}

// Método que faz a exclusão de uma operação no JSON Server

// TODO: Refatorar no futuro para fazer uma únic chamada passando uma lista de operações a serem removidas.
export function deleteOperacao(operacoes) {

  for (let i = 0; i < operacoes.length; i++) {

    axios.delete(DIGINVEST_API_BASE_URL + 'operacoes/' + operacoes[i].id);

  }  
   
}