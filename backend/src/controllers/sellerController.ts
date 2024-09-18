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
        
        const vendaInfo = saleInformationsHandler(venda.pagamento,product[0].precoCheio, product[0].precoDescontado,
            venda.qutd, venda.prazo, venda.frete, venda.desconto
        ) 

        let model : any = vendas
        let isSalesRequest = false;

        if (venda.desconto > vendaInfo.descontoMaximo){
            //cadastra uma solicitação
            model = pedidos
            isSalesRequest = true;
        }

        const result = await db.insert(model).values({
            sku: venda.sku,
            qutd: venda.qutd,
            somaProduto: vendaInfo.somaProduto, // dinamico
            frete: vendaInfo.frete, // dinamico
            prazo: venda.prazo, 
            desconto: venda.desconto, 
            descontoMaximo: vendaInfo.descontoMaximo, // dinamico
            pagamento : venda.pagamento,
            valorTotalVenda : vendaInfo.valorTotal,
            userId: req.user.id, // dinamico
        }).returning();

        console.log(result)
      
        return res.status(201).json({
            "result" : result,
            "isSalesRequest" : isSalesRequest
        })
    }
}