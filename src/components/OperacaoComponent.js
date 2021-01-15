import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import classNames from 'classnames';

import { getOperacoes, addOperacao, deleteOperacao } from './Service/OperacaoService';
import { getFII, getTesouro, getClasse, getTipoOp } from './Service/UtilsService';

export default function OperacaoComponent() {

// Elemento de dados para entrada de informações  
let operacaoVazia = {
    id: '',
    carteira: '',
    ativo: '',
    tipo: '',
    data: '',
    qtd: null,
    precoUnitario: null,
    taxa: null,
    numNota: ''
};  

const [operacoes, setOperacoes] = useState([]);
const [operacoesSelecionadas, setOperacoesSelecionadas] = useState(null);
const [excluirOperacoesDialog, setExcluirOperacoesDialog] = useState(false);
const [ativoDesabilitado, setAtivoDesabilitado] = useState(true);  
const [ativoSelecionado, setAtivoSelecionado] = useState(null);
const [tipoOpSelecionado, setTipoOpSelecionado] = useState(null);
const [classeSelecionada, setClasseSelecionada] = useState(null);
const [operacao, setOperacao] = useState(operacaoVazia);
const [submitted, setSubmitted] = useState(false);
const [operacaoDialog, setOperacaoDialog] = useState(false);  
const [ativos, setAtivos] = useState([]);
const classes = getClasse();
const tipoOps = getTipoOp();  
const toast = useRef(null);
const dt = useRef(null);  

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
const dataTemplate = (rowData) => {
  let data = '';
  data += rowData.data.substring(8,10);
  data += "/"
  data += rowData.data.substring(5,7);
  data += "/"
  data += rowData.data.substring(0,4);
  return data;
    
}
const custoTemplate = (rowData) => {
  return formatCurrency(rowData.custo);
}
const formatDate = (date) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
      month = '0' + month;
  }

  if (day < 10) {
      day = '0' + day;
  }

  return date.getFullYear() + '-' + month + '-' + day;
}

const br = {
  firstDayOfWeek: 1,
  dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
  dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
  dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
  monthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "septembro", "otubro", "novembro", "dezembro"],
  monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
  today: "Hoje",
  clear: "Claro"
};  
  
// Funções para asjute de status  
const openNew = () => {
  setOperacao(operacaoVazia);
  setTipoOpSelecionado(null);
  setAtivoSelecionado(null);
  setAtivoDesabilitado(true);
  setClasseSelecionada(null);
  setSubmitted(false);
  setOperacaoDialog(true);
}

const hideDialog = () => {
  setSubmitted(false);
  setOperacaoDialog(false);
}
  
const onInputChange = (e, name) => {
  const val = (e.target && e.target.value) || '';
  let _operacao = {...operacao};
  _operacao[`${name}`] = val;

  setOperacao(_operacao);
 }

 const onClasseChange = (e) => {
   setClasseSelecionada(e.value);
   if (e.value != null) {
    if (e.value.name === 'FII') {
      setAtivoDesabilitado(false);
      setAtivos(getFII());
    } else {
     setAtivoDesabilitado(false);
     setAtivos(getTesouro());
    }
   } else {
     setAtivos(null);
     setAtivoSelecionado(null);
     setAtivoDesabilitado(true);
  }
   
}  
  
const onAtivoChange = (e) => {
  setAtivoSelecionado(e.value);
}

const onTipoOpChange = (e) => {
  setTipoOpSelecionado(e.value);
}  
  
  
  
const hideExcluirOperacoesDialog = () => {
  setExcluirOperacoesDialog(false);
}
  
const confirmExcluirOperacoesSelecionadas = () => {
  setExcluirOperacoesDialog(true);
}
  
// Método para gravar operação

const saveOperacao = () => {
  setSubmitted(true);
  let _operacoes = [...operacoes];
  let _operacao = { ...operacao };

  // Só entra para salvar a operação, se os campos da tela estiverem preenchidos.
  if (((ativoSelecionado != null && ativoSelecionado.name.trim()) &&
    (tipoOpSelecionado != null && tipoOpSelecionado.name.trim())) &&  
    (_operacao.qtd != null && _operacao.qtd > 0) &&
    (_operacao.precoUnitario != null && _operacao.precoUnitario > 0) &&
    (_operacao.data != null)) {
    
    //let status = 0;
    _operacao.id = createId();
    _operacao.custo = (_operacao.qtd * _operacao.precoUnitario) + _operacao.taxa;
    _operacao.ativo = ativoSelecionado.name;
    _operacao.carteira = "Rodrigo";
    _operacao.tipo = tipoOpSelecionado.name;
    _operacao.data = formatDate(_operacao.data);

    //Chamada ao service
    addOperacao(_operacao).then(res => {
      if (res.status === 201) {
        _operacoes.push(_operacao);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Operacação cadastrada', life: 4000 });

        //Obtem lista atualizada do servidor
        getOperacoes().then((data) => setOperacoes(data));

      } else {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Operacação não foi cadastrada', life: 4000 });
      }
  
      setOperacaoDialog(false);
    });
  }

}

// Método para excluir operação
const excluirOperacoesSelecionadas = () => {
  
  deleteOperacao(operacoesSelecionadas);
  let _operacoes = operacoes.filter(val => !operacoesSelecionadas.includes(val));
  setOperacoes(_operacoes);    
  setExcluirOperacoesDialog(false);
  setOperacoesSelecionadas(null);
  toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Operações removidas com sucesso.', life: 3000 });
  
}

// Templates  
const leftToolbarTemplate = () => {
  return (
      <React.Fragment>
          <Button label="Nova Operação" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
          <Button label="Excluir" icon="pi pi-trash" onClick={confirmExcluirOperacoesSelecionadas} className="p-button-danger" disabled={!operacoesSelecionadas || !operacoesSelecionadas.length}/>
      </React.Fragment>
  )
}
  
/*const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            <Button label="Exportar" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
        </React.Fragment>
    )
}*/  

const operacaoDialogFooter = (
    <React.Fragment>
        <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={hideDialog} />
        <Button label="Salvar" icon="pi pi-check" className="p-button-success" onClick={saveOperacao} />
    </React.Fragment>
);
  
const excluirOperacoesDialogFooter = (
    <React.Fragment>
        <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideExcluirOperacoesDialog} />
        <Button label="Sim" icon="pi pi-check" className="p-button" onClick={excluirOperacoesSelecionadas} />
    </React.Fragment>
);
  
// Métodos auxiliares

const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

/*const exportCSV = () => {
    dt.current.exportCSV();
}*/  
  
  return (

    <div className="inside-content">
      <Toast ref={toast} />
      <Card title="Operações" subTitle="Insira, exclua e visualize todas as suas operações de investimento em tesouro direto, fundos de investimento e fundos imobiliários.">
      <Toolbar className="p-mb-4" left={leftToolbarTemplate} />
      <DataTable value={operacoes} ref={dt}className="p-datatable-gridlines" rowHover selection={operacoesSelecionadas} onSelectionChange={(e) => setOperacoesSelecionadas(e.value)}
        dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
        <Column field="ativo" header="Ativo" sortable></Column>
        <Column field="tipo" header="Tipo" sortable></Column>
        <Column field="data" header="Data" sortable body={dataTemplate}></Column>
        <Column field="qtd" header="Quantidade"></Column>
        <Column field="precoUnitario" header="Preço" body={precoTemplate}></Column>
        <Column field="taxa" header="Taxa" body={taxaTemplate}></Column>
        <Column field="custo" header="Custo" body={custoTemplate}></Column>
        <Column field="numNota" header="Número Nota"></Column>
      </DataTable>
      </Card>

      <Dialog visible={operacaoDialog} style={{ width: '500px' }} header="Detalhes da Operação" modal className="p-fluid" footer={operacaoDialogFooter} onHide={hideDialog}>
        {/*<div className="p-field">
           <label htmlFor="carteira">Carteira</label>
              <InputText id="carteira" value={operacao.carteira} onChange={(e) => onInputChange(e, 'carteira')} required autoFocus className={classNames({ 'p-invalid': submitted && !operacao.carteira })} />
              {submitted && !operacao.carteira && <small className="p-invalid">Carteira é obrigatório</small>}
        </div>*/}
        <div className="p-field">
          <label htmlFor="classe">Classe</label>
          <Dropdown value={classeSelecionada} options={classes} onChange={onClasseChange} optionLabel="name" id="classe" showClear required autoFocus className={classNames({ 'p-invalid': submitted && !classeSelecionada })} />
          {submitted && !classeSelecionada && <small className="p-invalid">Classe é obrigatória.</small>}
        </div>        
        <div className="p-field">
          <label htmlFor="ativo">Ativo</label>
          <Dropdown value={ativoSelecionado} disabled={ativoDesabilitado} options={ativos} onChange={onAtivoChange} optionLabel="name" id="ativo" filter showClear filterBy="name" required autoFocus className={classNames({ 'p-invalid': submitted && !ativoSelecionado })} />
          {submitted && !ativoSelecionado && <small className="p-invalid">Ativo é obrigatório.</small>}
        </div>
        <div className="p-field">
          <label htmlFor="tipo">Tipo da operação</label>
          <Dropdown value={tipoOpSelecionado} options={tipoOps} onChange={onTipoOpChange} optionLabel="name" id="tipo" showClear required autoFocus className={classNames({ 'p-invalid': submitted && !tipoOpSelecionado })} />
          {submitted && !tipoOpSelecionado && <small className="p-invalid">Tipo da operação é obrigatório.</small>}
        </div>
        <div className="p-field">
           <label htmlFor="qtd">Quantidade</label>
          <InputNumber id="qtd" value={operacao.qtd} onValueChange={(e) => onInputChange(e, 'qtd')} mode="decimal" minFractionDigits={8} required autoFocus className={classNames({ 'p-invalid': submitted && !operacao.qtd })} />
          {submitted && !operacao.qtd && <small className="p-invalid">Quantidade é obrigatório.</small>}
        </div>
        <div className="p-field" style={{ display: 'inline-block', width: '48%' }}>
             <label htmlFor="precoUnitario">Prçeo Unitário</label>
          <InputNumber id="precoUnitario" value={operacao.precoUnitario} onValueChange={(e) => onInputChange(e, 'precoUnitario')} mode="currency" currency="BRL" locale="pt-BR" required autoFocus className={classNames({ 'p-invalid': submitted && !operacao.precoUnitario })} />
            {submitted && !operacao.precoUnitario && <small className="p-invalid">Preço unitário é obrigatório.</small>}
         </div>
          <div className="p-field" style={{ float: 'right' }}>
           <label htmlFor="taxa">Taxa</label>
              <InputNumber id="taxa"  value={operacao.taxa} onValueChange={(e) => onInputChange(e, 'taxa')}mode="currency" currency="BRL" locale="pt-BR"/>
          </div>
        <div className="p-field" style={{ display: 'inline-block', width: '27%' }}>
           <label htmlFor="data">Data</label>
           <Calendar id="data" value={operacao.data} onChange={(e) => onInputChange(e, 'data')} locale={br} dateFormat="dd/mm/yy" required autoFocus className={classNames({ 'p-invalid': submitted && !operacao.data })} />
          {submitted && !operacao.data && <small className="p-invalid">Data é obrigatória.</small>}
        </div>
        <div style={{ float: 'right' }} className="p-field">
           <label htmlFor="numNota">Nota de Corretagem</label>
              <InputText id="numNota" value={operacao.numNota} onChange={(e) => onInputChange(e, 'numNota')} />
        </div>
      </Dialog>

      <Dialog visible={excluirOperacoesDialog} style={{ width: '450px' }} header="Confirmação" modal footer={excluirOperacoesDialogFooter} onHide={hideExcluirOperacoesDialog}>
        <div className="confirmation-content p-d-flex p-ai-center p-jc-center">
           <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
           {operacao && <span>Você realmente deseja excluir as operações selecionadas?</span>}
        </div>
      </Dialog>

    </div>

  );

}  