import { Request, Response } from 'express';
import { Pagamento, Prazo } from '../enums';
import { vendas, pedidos, products } from '../db/schema';
import {db} from '../db'
import { eq } from "drizzle-orm";
import { saleInformationsHandler } from '../utils';

interface VendaRequest {
    sku: string,
    qutd: number,
    somaProduto: number, // dinamico
    frete: number,
    prazo: Prazo, 
    desconto: number, 
    descontoMaximo: number, // dinamico
    userId: string, // dinamico
    pagamento : Pagamento
}

interface ProductRequest {
    sku: string,
    produto: string,
    precoCheio: string,
    precoDescontado: string,
}

export class SellerController{
    async createSale(req : Request, res : Response){
        const venda : VendaRequest = req.body;
        const product = await db.select().from(products)
            .where(eq(products.sku, venda.sku));

        const preco : number = getPrecoProduto(venda.pagamento,
            product[0].precoCheio, product[0].precoDescontado);
        
        const somaProduto : number = getSomaProduto(venda.qutd, preco);

        const adicionalPrazo : number = getAdicionalPrazo(preco, venda.prazo);
        
        // Aqui entraria função de cálculo de frete
        const frete = venda.frete

        const maxDiscount : number = getDescontoMaximo(venda.prazo, frete, preco);

        const desconto : number = getDiscount(venda.desconto, preco);

        const valorTotal : number = getValorTotal(somaProduto, frete, adicionalPrazo, desconto) 
        
        const vendaInfo = saleInformationsHandler(venda.pagamento,product[0].precoCheio, product[0].precoDescontado,
            venda.qutd, venda.prazo, venda.frete, venda.desconto
        ) 
        res.json(vendaInfo);
    }
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

