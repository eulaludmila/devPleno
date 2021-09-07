import React from 'react';
import { Redirect } from 'react-router';
import { useMovimentacaoApi } from '../../api'
import InfoMes from './InfoMes'
import AdicionarMovimentacao from './AdicionarMovimentacao'

const Movimentacoes = ({ match }) => {


    const { data, salvarMovimentacao, removerMovimentacao } = useMovimentacaoApi(match.params.data);


    const toSave = async (dados) => {

        await salvarMovimentacao(dados)
        
        setTimeout(() => {
            data.refetch();
        }, 3000)

    }

    const toRemove = async id => {
        await removerMovimentacao(`movimentacoes/${match.params.data}/${id}`);
        setTimeout(() => {
            data.refetch();
        }, 3000)
    }

    if (data.error === 'Permission denied') {
        return <Redirect to="/login" />
    }

    return (
        <div className="container">
            <h1>Movimentações</h1>
            <InfoMes data={match.params.data} />

            <table className='table'>
                <thead>
                    <tr>
                        <th>Descição</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data &&
                        Object.keys(data.data)
                            .map(movimentacao => {
                                return (
                                    <tr key={movimentacao}>
                                        <td>{data.data[movimentacao].descricao}</td>
                                        <td>{data.data[movimentacao].valor}</td>
                                        <td><button className="btn btn-danger" onClick={() => toRemove(movimentacao)}>Remover</button></td>
                                    </tr>
                                )
                            })
                    }
                    <AdicionarMovimentacao salvarMovimentacao={toSave}/>
                </tbody>
            </table>
        </div>
    )
}

export default Movimentacoes;