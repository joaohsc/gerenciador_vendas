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
    titulo: string,
    descricao: string, 
    descontoMaximo: number, // dinamico
    userId: string, // dinamico
    pagamento : Pagamento
}
interface VendaInfoRequest {
    precoFinal: number,
    somaProduto: number,
    frete: number,
    adicionalPrazo: number,
    descontoMaximo: number,
    valorTotal: number,
    valorDesconto: number
}
interface ProductRequest {
    sku: string,
    produto: string,
    precoCheio: string,
    precoDescontado: string,
}

export class SellerController{
    async deleteSale(req : Request, res : Response){
        const id : string = req.params.id
        const result = await db.delete(vendas).where(eq(vendas.id, id));
        return res.json(result)
    }
    async deleteSaleRequest(req : Request, res : Response){
        const id : string = req.params.id
        const result = await db.delete(pedidos).where(eq(pedidos.id, id));
        return res.json(result)
    }
    async getSalesRequest(req : Request, res : Response) {
        const result = await db.select().from(pedidos);
        return res.json(result)
    }
    async getSales(req : Request, res : Response){
        const result = await db.select().from(vendas);
        return res.json(result)
    }
    async createSalesRequest(req : Request, res : Response) {
        const venda : VendaRequest = req.body;
        const product = await db.select().from(products)
            .where(eq(products.sku, venda.sku));
        
        const vendaInfo = saleInformationsHandler(venda.pagamento,product[0].precoCheio, product[0].precoDescontado,
            venda.qutd, venda.prazo, venda.frete, venda.desconto
        ) 

        const result = await db.insert(pedidos).values(
            getSaleFields(venda, vendaInfo, req.user.id)
        ).returning();
      
        return res.status(201).json(result);
    }
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

        const result = await db.insert(model).values(
            getSaleFields(venda, vendaInfo, req.user.id)
        ).returning();
      
        return res.status(201).json({
            "result" : result,
            "isSalesRequest" : isSalesRequest
        });
    }
    async createAprovedSale(req : Request, res : Response){
        const idPedido : string = req.params.id
        const pedido = await db.select().from(pedidos).where(eq(pedidos.id, idPedido))

        const {id, userId, aprovado, gerenteId, comentario, ...sale} = pedido[0];
        const result = await db.insert(vendas).values(sale).returning();
        return res.status(201).json(result);
    }
}

function getSaleFields(venda : VendaRequest, vendaInfo : VendaInfoRequest, id : string) {
    const fields = {
        sku: venda.sku,
        qutd: venda.qutd,
        somaProduto: vendaInfo.somaProduto, // dinamico
        frete: vendaInfo.frete, // dinamico
        prazo: venda.prazo, 
        desconto: venda.desconto, 
        titulo : venda.titulo,
        descricao : venda.descricao,
        descontoMaximo: vendaInfo.descontoMaximo, // dinamico
        pagamento : venda.pagamento,
        valorTotalVenda : vendaInfo.valorTotal,
        userId: id, // dinamico
    }
    return fields
}