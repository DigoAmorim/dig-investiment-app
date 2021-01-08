import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import getOperacoes from './Service/OperacaoService';

export default function OperacaoComponent() {

// Elemento de dados para entrada de informações  
let operacaoVazia = {
    id: '',
    carteira: '',
    ativo: '',
    tipo: '',
    data: '',
    qtd: 0,
    precoUnitario: 0,
    taxa: 0,
    numNota: ''
};  

const [operacoes, setOperacoes] = useState([]);
const [operacoesSelecionadas, setOperacoesSelecionadas] = useState(null);
const [operacao, setOperacao] = useState(operacaoVazia);
const [submitted, setSubmitted] = useState(false);
const [operacaoDialog, setOperacaoDialog] = useState(false);  
const toast = useRef(null);

// Código que é carregado ao iniciar a aplicação  
useEffect(() => {
  getOperacoes().then((data) => setOperacoes(data));

}, []); // eslint-disable-line

// Formatadores de dados
const formatCurrency = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
const precoTemplate = (rowData) => {
  return formatCurrency(rowData.precoUnitario);
}
const taxaTemplate = (rowData) => {
  return formatCurrency(rowData.taxa);
}
const custoTemplate = (rowData) => {
  return formatCurrency(rowData.custo);
}

// Funções para asjute de status  
const openNew = () => {
    setOperacao(operacaoVazia);
    setSubmitted(false);
    setOperacaoDialog(true);
}  

// Templates  
const leftToolbarTemplate = () => {
  return (
      <React.Fragment>
          <Button label="Nova Operação" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
          <Button label="Delete" icon="pi pi-trash" className="p-button-danger" disabled={!operacoesSelecionadas || !operacoesSelecionadas.length}/>
      </React.Fragment>
  )
}

  return (

    <div className="inside-content">
      <Toast ref={toast} />
      <Card title="Operações" subTitle="Insira, altere, exclua e visualize todas as suas operações de investimento em tesouro direto, fundos de investimento e fundos imobiliários.">
      <Toolbar className="p-mb-4" left={leftToolbarTemplate}/>
      <DataTable value={operacoes} className="p-datatable-gridlines" rowHover selection={operacoesSelecionadas} onSelectionChange={(e) => setOperacoesSelecionadas(e.value)}
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                    <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                    <Column field="ativo" header="Ativo" sortable></Column>
                    <Column field="tipo" header="Tipo" sortable></Column>
                    <Column field="data" header="Data" sortable></Column>
                    <Column field="qtd" header="Quantidade"></Column>
                    <Column field="precoUnitario" header="Preço"  body={precoTemplate}></Column>
                    <Column field="taxa" header="Taxa" body={taxaTemplate}></Column>
                    <Column field="custo" header="Custo" body={custoTemplate}></Column>
                    <Column field="numNota" header="Número Nota"></Column>
                </DataTable>
      </Card>  
    </div>

  );

}  