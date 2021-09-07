const functions = require("firebase-functions");// vai fazer algo ao salvar em movimentações
const admin = require('firebase-admin'); //acesso ao banco realtime-database geral

admin.initializeApp()//login

//exportar função que estará vinculada ao database e vou passar a referência
exports.soma = functions.database.ref('/movimentacoes/{dia}')
.onWrite(async(change, context) => {
    //pegar referencias para os meus meses
    const mesesRef = admin.database().ref(`/meses/${context.params.dia}`)
    //pegar referência depois de ela acontecer
    const movimentacoesRef = change.after.ref;
    //Esperar retornae os dados. OBS.: SS --> SnapShot
    const movimentacoesSS = await movimentacoesRef.once('value');
    //Converter para o valor
    const movimentacoes = movimentacoesSS.val();

    let entradas = 0;
    let saidas = 0;

    Object.keys(movimentacoes).forEach(m => {
        if(movimentacoes[m].valor > 0){
            entradas += movimentacoes[m].valor;
        }else{
            saidas += movimentacoes[m].valor;
        }
    })

    return mesesRef.transaction(current => {
        if(current === null){
            return {
                entradas,
                saidas,
                previsao_entrada:0,
                previsao_saida:0,
            }
        }

        return {
            ...current,
            entradas,
            saidas,
        }
    })

})

