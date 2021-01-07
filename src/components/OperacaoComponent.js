import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import getOperacoes from './Service/OperacaoService';

export default function OperacaoComponent() {

const [operacoes, setOperacoes] = useState([]);
  
useEffect(() => {
  getOperacoes().then((data) => setOperacoes(data));

    //console.log('Operações ==>> ' + operacoes[1].ativo); 
  
}, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (

    <div className="inside-content">
      <Card title="Operações" subTitle="Insira, altere, exclua e visualize todas as suas operações de investimento em tesouro direto, fundos de investimento e fundos imobiliários.">
      </Card>  
    </div>

  );

}  