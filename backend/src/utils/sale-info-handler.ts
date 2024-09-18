import { Pagamento,Prazo } from "../enums";

export function saleInformationsHandler(pag : Pagamento, precoCheio : number, 
    precoDescontado : number, qutd : number, tipoPrazo : Prazo, vendaFrete : number,
    vendaDesconto : number) {
    const preco : number = getPrecoProduto(pag,
        precoCheio, precoDescontado);
    
    const somaProduto : number = getSomaProduto(qutd, preco);

    const adicionalPrazo : number = getAdicionalPrazo(preco, tipoPrazo);
    
    // Aqui entraria função de cálculo de frete
    const frete = vendaFrete

    const maxDiscount : number = getDescontoMaximo(tipoPrazo, frete, preco);

    const desconto : number = getDiscount(vendaDesconto, preco);

    const valorTotal : number = getValorTotal(somaProduto, frete, adicionalPrazo, desconto) 
    const result : { precoFinal: number, somaProduto : number, frete : number,
        adicionalPrazo : number, descontoMaximo : number, valorTotal : number,
        valorDesconto : number } = {
        precoFinal : preco,
        somaProduto : somaProduto,
        frete : frete,
        adicionalPrazo : adicionalPrazo,
        descontoMaximo : maxDiscount,
        valorTotal : valorTotal,
        valorDesconto : desconto
    }

    return result;
}

function getSomaProduto(qutd : number, preco : number){
    return qutd * preco;
}; 

function getAdicionalPrazo(preco : number, prazo : Prazo) {
    let value : number = 0;
    switch(prazo) {
        case "TURBO":
            value = 0.10 * preco;
            return value;
        case "SUPER TURBO":
            value = 0.20 * preco;
            return value;
        default:
            return value;
    }
}

function getPrecoProduto(pag : Pagamento, precoCheio : number, precoDescontado : number){
    if(pag === "cartao"){
        return precoCheio;
    }
    return precoDescontado;
}

function getValorTotal(somaProdutos : number, frete : number, adicionalPrazo : number, desconto : number){
    return somaProdutos + frete + adicionalPrazo - desconto;
}

function getDescontoMaximo(prazo : Prazo, frete : number, preco : number){
    let value : number = 0;
    switch(prazo) {
        case "PADRAO":
            value = descontoMaximoOperations(preco, 0.05, frete);
            return value;
        case "TURBO":
            value = descontoMaximoOperations(preco, 0.10, frete);
            return value;
        case "SUPER TURBO":
            value = descontoMaximoOperations(preco, 0.20, frete);
            return value;
        default:
            return value;
    }

}

function descontoMaximoOperations(preco : number, desconto : number, frete : number){
    let calc : number = desconto * preco ;
    let arr : number[] = [ frete, calc ];
    let valorMaior : number = Math.max(...arr);
    return valorMaior;
}

function getDiscount(desconto : number, preco : number){
    let discount : number =  preco * (desconto / 100);
    return discount;
}
