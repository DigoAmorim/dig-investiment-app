import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import classNames from 'classnames';

import { getDividendos, addDividendo, deleteDividendo } from './Service/DividendosService';
import { getFII } from './Service/UtilsService';

export default function DividendosComponent() {

  // Elemento de dados para entrada de informações  
  let dividendoVazio = {
    id: '',
    carteira: '',
    ativo: '',
    rendimento: null,
    total: null,
    qtd: null,
    data: ''
  };  

  const [dividendos, setDividendos] = useState([]);
  const [dividendosSelecionados, setDividendosSelecionados] = useState(null);
  const [excluirDividendosDialog, setExcluirDividendosDialog] = useState(false);
  const [dividendo, setDividendo] = useState(dividendoVazio);
  const [ativoSelecionado, setAtivoSelecionado] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [dividendoDialog, setDividendoDialog] = useState(false);  
  const [ativos, setAtivos] = useState([]);
  const toast = useRef(null);
  const dt = useRef(null);  

  // Código que é carregado ao iniciar a aplicação  
  useEffect(() => {
    getDividendos().then((data) => setDividendos(calculaTotal(data)));

  }, []); // eslint-disable-line

  // Formatadores de dados
  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  const rendimentoTemplate = (rowData) => {
    return formatCurrency(rowData.rendimento);
  }

  const totalTemplate = (rowData) => {
    return formatCurrency(rowData.total);
  }
  
  const dataTemplate = (rowData) => {
    let data = '';
    data += rowData.data.substring(8, 10);
    data += "/"
    data += rowData.data.substring(5, 7);
    data += "/"
    data += rowData.data.substring(0, 4);
    return data;
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
    setDividendo(dividendoVazio);
    setSubmitted(false);
    setAtivos(getFII());
    setDividendoDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setDividendoDialog(false);
  }
  
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';

    let _dividendo = { ...dividendo };
    
    _dividendo[`${name}`] = val;
    if (_dividendo.rendimento > 0 && _dividendo.qtd > 0) {
      _dividendo.total = _dividendo.rendimento * _dividendo.qtd;
    } else {
      _dividendo.total = 0.
    }

    setDividendo(_dividendo);
  }

  const onAtivoChange = (e) => {
    setAtivoSelecionado(e.value);
  }

  const hideExcluirDividendosDialog = () => {
    setExcluirDividendosDialog(false);
  }
  
  const confirmExcluirDividendosSelecionados = () => {
    setExcluirDividendosDialog(true);
  }
  
// Método para gravar operação

const saveDividendo = () => {
  setSubmitted(true);
  let _dividendos = [...dividendos];
  let _dividendo = { ...dividendo };

  // Só entra para salvar a operação, se os campos da tela estiverem preenchidos.
  if ((_dividendo.rendimento != null && _dividendo.rendimento > 0) &&
    (_dividendo.data != null)) {
    
    //let status = 0;
    _dividendo.id = createId();
    _dividendo.ativo = ativoSelecionado.name;
    _dividendo.carteira = "Rodrigo";
    _dividendo.data = formatDate(_dividendo.data);

    //Chamada ao service
    addDividendo(_dividendo).then(res => {
      if (res.status === 201) {
        _dividendos.push(_dividendo);
        toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Operacação cadastrada', life: 4000 });

        //Obtem lista atualizada do servidor
        getDividendos().then((data) => setDividendos(calculaTotal(data)));

      } else {
        toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Operacação não foi cadastrada', life: 4000 });
      }
  
      setDividendoDialog(false);
    });
  }

}

// Método para excluir operação
const excluirDividendosSelecionados = () => {
  
  deleteDividendo(dividendosSelecionados);
  let _dividendos = dividendos.filter(val => !dividendosSelecionados.includes(val));
  setDividendos(_dividendos);    
  setExcluirDividendosDialog(false);
  setDividendosSelecionados(null);
  toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Dividendos removidos com sucesso.', life: 3000 });
  
}

// Templates  
const leftToolbarTemplate = () => {
  return (
      <React.Fragment>
          <Button label="Novo Dividendo" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
          <Button label="Excluir" icon="pi pi-trash" onClick={confirmExcluirDividendosSelecionados} className="p-button-danger" disabled={!dividendosSelecionados || !dividendosSelecionados.length}/>
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

const dividendoDialogFooter = (
    <React.Fragment>
        <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={hideDialog} />
        <Button label="Salvar" icon="pi pi-check" className="p-button-success" onClick={saveDividendo} />
    </React.Fragment>
);
  
const excluirDividendosDialogFooter = (
    <React.Fragment>
        <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideExcluirDividendosDialog} />
        <Button label="Sim" icon="pi pi-check" className="p-button" onClick={excluirDividendosSelecionados} />
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
  
  const calculaTotal = (dividendos) => {

    for (let i = 0; i < dividendos.length; i++) {
      dividendos[i].total = dividendos[i].qtd * dividendos[i].rendimento;
    }
    return dividendos;
  }

/*const exportCSV = () => {
    dt.current.exportCSV();
}*/  
  
  return (

    <div className="inside-content">
      <Toast ref={toast} />
      <Card title="Dividendos" subTitle="Insira, exclua e visualize todas os dividendos recebidos dos fundos imobiliários e ações.">
      <Toolbar className="p-mb-4" left={leftToolbarTemplate} />
      <DataTable value={dividendos} ref={dt}className="p-datatable-gridlines" rowHover selection={dividendosSelecionados} onSelectionChange={(e) => setDividendosSelecionados(e.value)}
        dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
        <Column field="ativo" header="Ativo" sortable></Column>
        <Column field="rendimento" header="Rendimento" body={rendimentoTemplate}></Column>
          <Column field="qtd" header="Quantidade"></Column>  
          <Column field="total" header="Total" body={totalTemplate}></Column>
        <Column field="data" header="Data" sortable body={dataTemplate}></Column>
      </DataTable>
      </Card>

      <Dialog visible={dividendoDialog} style={{ width: '450px' }} header="Detalhes da Operação"  modal className="p-fluid" footer={dividendoDialogFooter} onHide={hideDialog}>
        {/*<div className="p-field">
           <label htmlFor="carteira">Carteira</label>
              <InputText id="carteira" value={operacao.carteira} onChange={(e) => onInputChange(e, 'carteira')} required autoFocus className={classNames({ 'p-invalid': submitted && !operacao.carteira })} />
              {submitted && !operacao.carteira && <small className="p-invalid">Carteira é obrigatório</small>}
        </div>*/}
        <div className="p-field">
          <label htmlFor="classe">Classe</label>
          <InputText value="FII" disabled="true" optionLabel="classe" id="classe" showClear autoFocus/>
        </div>
        <div className="p-field">
        <label htmlFor="ativo">Ativo</label>
          <Dropdown value={ativoSelecionado} options={ativos} onChange={onAtivoChange} optionLabel="name" id="ativo" filter showClear filterBy="name" required autoFocus className={classNames({ 'p-invalid': submitted && !ativoSelecionado })} />
          {submitted && !ativoSelecionado && <small className="p-invalid">Ativo é obrigatório.</small>}
        </div>
        <div className="p-field">
        <label htmlFor="rendimento">Rendimento</label>
          <InputNumber id="rendimento" value={dividendo.rendimento} onValueChange={(e) => onInputChange(e, 'rendimento')} mode="currency" currency="BRL" locale="pt-BR" required autoFocus className={classNames({ 'p-invalid': submitted && !dividendo.rendimento })} />
            {submitted && !dividendo.rendimento && <small className="p-invalid">Rendimento é obrigatório.</small>}
         </div>        
        <div className="p-field">
        <label htmlFor="qtd">Quantidade</label>
          <InputNumber id="qtd" value={dividendo.qtd} onValueChange={(e) => onInputChange(e, 'qtd')} mode="decimal" minFractionDigits={8} required autoFocus className={classNames({ 'p-invalid': submitted && !dividendo.qtd })} />
          {submitted && !dividendo.qtd && <small className="p-invalid">Quantidade é obrigatório.</small>}
        </div>
        <div className="p-field">
        <label htmlFor="qtd">Total</label>
          <InputNumber disabled id="qtd" value={dividendo.total} onValueChange={(e) => onInputChange(e, 'total')} mode="currency" currency="BRL" locale="pt-BR" />
        </div>        
        <div className="p-field" style={{ width: '27%' }}>
           <label htmlFor="data">Data</label>
           <Calendar id="data" value={dividendo.data} onChange={(e) => onInputChange(e, 'data')} locale={br} dateFormat="dd/mm/yy" required autoFocus className={classNames({ 'p-invalid': submitted && !dividendo.data })} />
          {submitted && !dividendo.data && <small className="p-invalid">Data é obrigatória.</small>}
        </div>
      </Dialog>

      <Dialog visible={excluirDividendosDialog} style={{ width: '450px' }} header="Confirmação" modal footer={excluirDividendosDialogFooter} onHide={hideExcluirDividendosDialog}>
        <div className="confirmation-content p-d-flex p-ai-center p-jc-center">
           <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
           {dividendo && <span>Você realmente deseja excluir os dividendos selecionados?</span>}
        </div>
      </Dialog>

    </div>

  );

}  