/* eslint-disable import/no-anonymous-default-export */
import Rest from '../utils/Hooks/rest';
const baseUrl = 'https://mymoney-2021-default-rtdb.firebaseio.com/';
const { useGet, usePost, useDelete, usePatch } = Rest(baseUrl);

const useMesApi = (url) => {
    const infoMes = useGet(`meses/${url}`);
    const [dataPatch, alterarMes] = usePatch(`meses/${url}`);

    return {infoMes, alterarMes}
}

const useMovimentacaoApi = (url) => {
    const [postData, salvarMovimentacao] = usePost(`movimentacoes/${url}`);
    const data = useGet(`movimentacoes/${url}`);
    const [removeData, removerMovimentacao] = useDelete();

    return {data, salvarMovimentacao, removerMovimentacao};
}

export {
    useMesApi,
    useMovimentacaoApi
}