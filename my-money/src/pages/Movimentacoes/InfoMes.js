import React from 'react';
import {useMesApi} from '../../api';

const InfoMes = ({data}) => {
    const {infoMes, alterarMes} = useMesApi(data);

    const alterarPrevisaoEntrada = (evt) => {
        alterarMes({previsao_entrada: evt.target.value});
    }

    const alterarPrevisaoSaida = (evt) => {
        alterarMes({previsao_saida: evt.target.value});
    }

    if(infoMes.loading){
        return <p>Carregando dados do mês...</p>
    }

    if(infoMes.data){
        <div>
                Previsão entrada: {infoMes.data.previsao_entrada} <input type="text" onBlur={alterarPrevisaoEntrada}/> / Previsão saída: {infoMes.data.previsao_saida} <input type="text" onBlur={alterarPrevisaoSaida}/> <br/>
                Entradas: {infoMes.data.entradas} <br/>
                Saídas: {infoMes.data.saidas} <br/>
            </div> 
    }
    return null;
}

export default InfoMes;