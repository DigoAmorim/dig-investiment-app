import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { getOperacoes } from './Service/OperacaoService';
import { getDividendos, getTotalDividendos } from './Service/DividendosService';
import { montaPosicao, montaDadosSinteticos, obtemCotacaoGoogle } from './Service/FinanceiroService';

export default function FundosImoComponent() {

  let dadosSinteticos = {
    cTotal: 0,
    aTotal: 0,
    rentBrt: 0,
    rentBrtP: 0,
    rentLiq: 0,
    rentLiqp: 0,
    div: 0,
    rentBrtDiv: 0,
    rentBrtDivP: 0
  };

  const [dadosSint, setDadosSint] = useState(dadosSinteticos);
  const [posicoes, setPosicoes] = useState(null);
  
  // Código que é carregado ao iniciar a aplicação  
  useEffect(() => {
    async function fetchData() {
      const operacoes = await getOperacoes();
      const dividendos = await getDividendos();
      const cotacoes = await obtemCotacaoGoogle();
      const resultPos = await montaPosicao(operacoes, "FII", cotacoes);
      const totDivid = getTotalDividendos(dividendos, 'Rodrigo');
      const sintPos = montaDadosSinteticos(resultPos, totDivid);
      


      setPosicoes(resultPos);
      setDadosSint(sintPos);
    }
    fetchData();
  }, []); // eslint-disable-line
    
  //Funções utilitárias
  const obtemCorCelula = (valor) => {
    if (valor === 0) {
      return '' // Não muda nada
    } else if (valor > 0) {
      return 'letraCorVerde'
    } else {
      return 'letraCorVermelha'
    }
  }

  // Formatadores de dados
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  
  //Templates de dados
  const pMedioTaxasTemplate = (rowData) => {
    return formatCurrency(rowData.pMedioTaxas);
  }
  const cTotalTaxasTemplate = (rowData) => {
    return formatCurrency(rowData.cTotalTaxas);
  }
  const pAtualTemplate = (rowData) => {
    return formatCurrency(rowData.pAtual);
  }
  const vAtualTemplate = (rowData) => {
    return formatCurrency(rowData.vAtual);
  }
  const dadosSintTemplateMoeda = (valor) => {
    return (
      <span className={obtemCorCelula(valor)} style={{ fontWeight: '600' }}>
        {formatCurrency(valor)}
      </span>
    );
  }
  const dadosSintTemplatePerc = (valor) => {
    if (isNaN(valor)) {
      valor = 0;
    }
    return (
      <span className={obtemCorCelula(valor)} style={{ fontWeight: '600' }}>
        {parseFloat(valor).toFixed(2)+"%"}
      </span>
    );
  }
  const saldoTemplate = (rowData) => {
    return (
     <div className={obtemCorCelula(rowData.saldo)}>
       {formatCurrency(rowData.saldo)}
     </div>
   );
  }  
  const gapCotaTemplate = (rowData) => {
    return (
      <div className={obtemCorCelula(rowData.gapCota)}>
        {formatCurrency(rowData.gapCota)}
      </div>
    );
  }
  const variacaoTemplate = (rowData) => {
    return (
      <div className={obtemCorCelula(rowData.variacao)}>
        {parseFloat(rowData.variacao).toFixed(2)+"%"}
      </div>
    );
  }

  return (
    <div className="inside-content">
      <Card title="Fundos Imobiliários" subTitle="Acompanhe aqui a posição dos seus fundos imobiliários">
          <Accordion activeIndex={1}>
            <AccordionTab header="Resumo da Posição">
              <div style={{ width: '100%', display: 'table' }} >
                <div style={{ width: '50%', display: 'table-cell' }} >
                  <p>Custo Total: {dadosSintTemplateMoeda(dadosSint.cTotal)}</p>
                  <p>Ativo Total: {dadosSintTemplateMoeda(dadosSint.aTotal)}</p>
                  <p>Rentabilidade Bruta (R$): {dadosSintTemplateMoeda(dadosSint.rentBrt)}</p>
                  <p>Rentabilidade Bruta (%): {dadosSintTemplatePerc(dadosSint.rentBrtP)}</p>
                  <p>Rentabilidade Líquida (R$): {dadosSintTemplateMoeda(dadosSint.rentLiq)}</p>
                  <p>Rentabilidade Líquida (%): {dadosSintTemplatePerc(dadosSint.rentLiqP)}</p>
                </div>
                <div style={{ display: 'table-cell' }}>
                  <p>Dividendos: {dadosSintTemplateMoeda(dadosSint.div)}</p>
                  <p>Rentabilidade Bruto + Dividendos (R$): {dadosSintTemplateMoeda(dadosSint.rentBrtDiv)}</p>
                  <p>Rentabilidade Bruta + Dividendos (%): {dadosSintTemplatePerc(dadosSint.rentBrtDivP)}</p>
                </div>
              </div>
            </AccordionTab >
            <AccordionTab header="Posição Detalhada">
              <DataTable className="p-datatable-gridlines" id="tbfii" value={posicoes}>
                <Column field="ativo" header="Ativo" sortable></Column>
                <Column field="qtdCompra" header="Quantidade" sortable></Column>
                <Column field="pMedioTaxas" header="Preço Médio" body={pMedioTaxasTemplate} sortable></Column>
                <Column field="cTotalTaxas" header="Custo Total" body={cTotalTaxasTemplate} sortable></Column>
                <Column field="pAtual" header="Preço Atual" body={pAtualTemplate} sortable></Column>
                <Column field="vAtual" header="Valor Atual" body={vAtualTemplate} sortable></Column>
                <Column field="saldo" header="Saldo" body={saldoTemplate} sortable></Column>
                <Column field="gapCota" header="Gap da Cota" body={gapCotaTemplate} sortable></Column>
                <Column field="variacao" header="Variação" body={variacaoTemplate} sortable></Column>
              </DataTable>
            </AccordionTab>
          </Accordion>
      </Card>
    </div>  
  );
}  