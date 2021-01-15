import { getTipoAtivo, GOOGLE_PRIVATE_KEY, GOOGLE_SPREADSHEET_KEY, GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL } from './UtilsService';
import { GoogleSpreadsheet } from 'google-spreadsheet';

// Elemento de dados para entrada de informações  
var Posicao = function(ativo,qtdCompra,qtdVenda,pMedioTaxas,pAtual){
  this.ativo = ativo;
  this.qtdCompra = qtdCompra;
  this.qtdVenda = qtdVenda;
  this.pMedioTaxas = pMedioTaxas;
  this.cTotalTaxas = qtdCompra * pMedioTaxas;
  this.pAtual = pAtual;
  this.vAtual = pAtual * qtdCompra;
  this.saldo = this.vAtual - this.cTotalTaxas;
  this.gapCota = pAtual - pMedioTaxas;
  this.variacao = (this.vAtual/this.cTotalTaxas) - 1;
};

var Cotacao = function (ativo, valor) {
  this.ativo = ativo;
  this.cotacao = valor;
};

// Elemento de dados para entrada de informações  
var DadosSinteticos = function(cTotal, aTotal, rentBrt, rentBrtP, rentLiq, rentLiqp, div, rentBrtDiv, rentBrtDivP){
  this.cTotal = cTotal;
  this.aTotal = aTotal;
  this.rentBrt = rentBrt;
  this.rentBrtP = rentBrtP;
  this.rentLiq = rentLiq;
  this.rentLiqp = rentLiqp;
  this.div = div;
  this.rentBrtDiv = rentBrtDiv;
  this.rentBrtDivP = rentBrtDivP;
};

export function montaDadosSinteticos(posicoes, divTotal) {
  let dadosSinteticos = new DadosSinteticos(0, 0, 0, 0, 0, 0, 0, 0, 0);
  
  // Itera as operações
  for (let i = 0; i < posicoes.length; i++) {
    dadosSinteticos.cTotal += posicoes[i].cTotalTaxas;
    dadosSinteticos.aTotal += posicoes[i].vAtual;
  }

  dadosSinteticos.rentBrt = dadosSinteticos.aTotal - dadosSinteticos.cTotal;
  dadosSinteticos.rentBrtP = ((dadosSinteticos.aTotal / dadosSinteticos.cTotal) - 1) * 100;

  if (dadosSinteticos.rentBrt > 0) {
    dadosSinteticos.rentLiq = dadosSinteticos.rentBrt * 0.80;
    dadosSinteticos.rentLiqP = dadosSinteticos.rentBrtP * 0.80;
  } else {
    dadosSinteticos.rentLiq = dadosSinteticos.rentBrt;
    dadosSinteticos.rentLiqP = dadosSinteticos.rentBrtP;
  }
  
  dadosSinteticos.div = divTotal;

  dadosSinteticos.rentBrtDiv = dadosSinteticos.rentBrt + dadosSinteticos.div;
  dadosSinteticos.rentBrtDivP = (dadosSinteticos.rentBrtDiv / dadosSinteticos.cTotal) * 100;

  return dadosSinteticos;
}

export function montaPosicao(operacoes, tipoAtivo, cotacoes) {
  
  let posicoes = [];
  let _posicao;
  // 0 -> Ativo Não Existe :: 1 -> Ativo Existe
  let ativoExiste = 0;

  // Itera as operações
  for (let i = 0; i < operacoes.length; i++) {
    // Verifica se a operação é um FII
    if (getTipoAtivo(operacoes[i].ativo) === tipoAtivo) {
      // Itera sobre a lista de posições
      // seta a variável como 0 pois trata de uma nova busca
      ativoExiste = 0;
      for (let j = 0; j < posicoes.length; j++) {
        // Verifica se são os mesmos ativos para compor os valores
        if (posicoes[j].ativo === operacoes[i].ativo) {
          if (operacoes[i].tipo === "Compra") {
            // Atualizando o preço médio
            posicoes[j].pMedioTaxas = (((posicoes[j].pMedioTaxas * posicoes[j].qtdCompra) + ((operacoes[i].qtd * operacoes[i].precoUnitario) + operacoes[i].taxa)) / (operacoes[i].qtd + posicoes[j].qtdCompra));
            // Atualizando a quantidade
            posicoes[j].qtdCompra += operacoes[i].qtd;
            // Atualizando o Custo Total
            posicoes[j].cTotalTaxas = posicoes[j].qtdCompra * posicoes[j].pMedioTaxas;
            // Atualizando Valor Atual
            posicoes[j].vAtual = posicoes[j].pAtual * posicoes[j].qtdCompra;
            // Atualizando Saldo
            posicoes[j].saldo = posicoes[j].vAtual - posicoes[j].cTotalTaxas;
            // Atualizando Gap da Cota
            posicoes[j].gapCota = posicoes[j].pAtual - posicoes[j].pMedioTaxas;
            // Atualizando Variação
            posicoes[j].variacao = (posicoes[j].vAtual / posicoes[j].cTotalTaxas) - 1;
          } else if (operacoes[i].tipo === "Venda") {
            // Atualizando a quantidade
            posicoes[j].qtdVenda += operacoes[i].qtd
          }
          // Ativo encontrado, flag é acionado.
          ativoExiste = 1;
          // Sai do loop atual
          break;
        }
      }
      //console.log('Passou aqui');
      if (ativoExiste === 0) {

        let _pMedio = (operacoes[i].custo / operacoes[i].qtd);
        let _cotAtualizada = 0;

        for (let k = 0; k < cotacoes.length; k++) {
          if (cotacoes[k].ativo === operacoes[i].ativo) {
            _cotAtualizada = cotacoes[k].cotacao;
            break;
          }
        }

        _posicao = new Posicao(operacoes[i].ativo, operacoes[i].qtd, 0, _pMedio, _cotAtualizada);
          posicoes.push(_posicao);
          
      }
    }
  }
  return posicoes;
}

export async function obtemCotacaoGoogle() {
  
  let cotacoes = [];

  if (3 < 2) {

    const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_KEY);
    
    await doc.useServiceAccountAuth({
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    });

    await doc.loadInfo();

    const sheet = doc.sheetsById[GOOGLE_SHEET_ID];
    await sheet.loadCells('A1:B9'); // 9 linhas
    
    for (let i = 1; i < 9; i++) {
      cotacoes.push(new Cotacao(sheet.getCell(i,0).value,sheet.getCell(i,1).value))
    }

  }
  return cotacoes;
}  